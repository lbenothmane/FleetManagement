import can
import queue
import time
import os
import config
from api_engine import API_Engine
from threading import Thread

ID_FIRST_BYTE = 0x02
ID_SECOND_BYTE = 0x01

PID_REQUEST = 0x7DF
PID_RESPONSE = 0x7E8

def get_request_message(self, pid):
    return can.Message(arbitration_id=PID_REQUEST, data=[ID_FIRST_BYTE, ID_SECOND_BYTE, pid, 0x00, 0x00, 0x00, 0x00, 0x00], extended_id=False)


class CANHandler(Thread):
    def __init__(self, bitrate, pids):
        super(CANHandler, self).__init__()
        self.api_engine = API_Engine()

    def startup(self):
        os.system("sudo /sbin/ip link set can0 up type can bitrate " + str(config.BITRATE))
        time.sleep(0.1)
        return True

    def shutdown(self):
        os.system("sudo /sbin/ip link set can0 down")
        time.sleep(0.1)

    def read_messages(self):
        while True:
            message = self.bus.recv()
            if message.arbitration_id == PID_RESPONSE:
                self.q.put(message)

    def write_requests(self):
        while True:
            for pid in self.pids:
                message = get_request_message(pid)
                try:
                    self.bus.send(message)
                    time.sleep(0.05)
                except can.CanError:
                    pass

            time.sleep(2)

    def run(self):
        self.bus = can.interface.Bus(channel='can0', bustype='socketcan_native')
        self.q = queue.Queue()
        reader = Thread(target = self.read_messages)
        reader.start()
        writer = Thread(target = self.write_requests)
        writer.start()
        while True:
            while(self.q.empty()):
                pass
            message = self.q.get()
            pid = message.data[2]
            if pid in ConfigStore().get_pids():
                data = message.data[3]
                self.api_engine.pid_send(pid, data)
                time.sleep(.1)

def main():
    can = CANHandler(ConfigStore().get_bitrate(), ConfigStore().get_pids())
    can.api_engine.set_logging(True)
    can.api_engine.set_send(False)
    can.startup()
    try:
        can.start()
    except Exception:
        can.shutdown()

if __name__ == "__main__":
    main()
