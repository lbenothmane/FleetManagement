import decimal
import time
import sys
import argparse
import threading
import can_interface
import gps_interface
import config
from api_engine import API_Engine
from config import ConfigStore


class FleetMonitorApp:
    def __init__(self):
        pass

    def startup(self):
        result = True
		
        vehicle = API_Engine().get_vehicle()
        vehicle["did"] = ConfigStore().get_did()
        ConfigStore().set_vehicle(vehicle)

        # Check for PiCAN connection
        try:
            self.can = can_interface.CanHandler()
            if not self.can.startup():
                return False
        except:
            return False

        # Check for GPS connection
        try:
            self.gps = gps_interface.GPSHandler()
            if not self.gps.setup():
                return False
        except:
            return False
            
        API_Engine().start()

    def run_hardware(self):
        try:
            self.can.start()
            self.gps.start()
            self.can.join(None)
            self.gps.join(None)
        except:
            print("An error from the hardware occurred")
        self.can.shutdown()
		
    def run(self):
        try:
            while True:
                vehicle = API_Engine().get_vehicle()
                vehicle["did"] = ConfigStore().get_did()
                ConfigStore().set_vehicle(vehicle)
                time.sleep(60)
        except:
            print("The server configuration thread experienced an error")	


def main():
    app = FleetMonitorApp()
    parser = argparse.ArgumentParser()
    parser.add_argument("-s", "--serverUri", dest="serverUri", type=str, help="the server URI to send requests to")
    parser.add_argument("-d", "--driverID", dest="driverID", default=0, type=int, help="the ID of the driver using the vehicle")
    parser.add_argument("-v", "--vehicleID", dest="vehicleID", default=0, type=int, help="the ID of this vehicle")
    parser.add_argument("-l", "--log", help="output API calls", action="store_true")
    args = parser.parse_args()
    if args.serverUri:
        server = {"uri": args.serverUri}
        API_Engine().set_send(True)
        ConfigStore().set_server(server)
    else:
        API_Engine().set_send(False)
        API_Engine().set_logging(True)
    if args.log:
        API_Engine().set_logging(True)
    if args.vehicleID and args.driverID:
        vehicle = {"vid": args.vehicleID}
        vehicle["did"] = args.driverID
        vehicle["pids"] = []
        ConfigStore().set_vehicle(vehicle)
    if app.startup():
        app.run_hardware()
        app.run()

if __name__ == "__main__":
    main()
