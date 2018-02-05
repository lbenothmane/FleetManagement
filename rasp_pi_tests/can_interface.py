import can
import queue
import time
import os
import config
from threading import Thread

BITRATE=500000

ID_FIRST_BYTE = 0x02
ID_SECOND_BYTE = 0x01

VEHICLE_SPEED = 0x0D
GAS_LEVEL = 0x2F

PID_REQUEST = 0x7DF
PID_RESPONSE = 0x7E8

class CANHandler(Thread):
	def __init__(self):
		super(CANHandler, self).__init__()
		os.system("sudo /sbin/ip link set can0 up type can bitrate " + str(BITRATE))
		time.sleep(0.1)
		self.speed = 0
		self.gas = 0

	def get_request_message(self, pid):
		return can.Message(arbitration_id=PID_REQUEST, data=[ID_FIRST_BYTE, ID_SECOND_BYTE, pid, 0x00, 0x00, 0x00, 0x00, 0x00], extended_id=False)	

	def read_messages(self):
		while True:
			message = self.bus.recv()
			if message.arbitration_id == PID_RESPONSE:
				self.q.put(message)

	def write_requests(self):
		while True:
			message = self.get_request_message(VEHICLE_SPEED)
			self.bus.send(message)
			time.sleep(1)

			message = self.get_request_message(GAS_LEVEL)
			self.bus.send(message)
			time.sleep(0.05)

			# send more messages

			time.sleep(0.1)

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
			if message.arbitration_id == PID_RESPONSE and message.data[2] == VEHICLE_SPEED:
				self.speed = int(message.data[3]) * 0.621371 #KM/HR to MPH
			if message.arbitration_id == PID_RESPONSE and message.data[2] == GAS_LEVEL:
				self.gas= (int(message.data[3]) / 255.0) * config.car['fuel_volume']
