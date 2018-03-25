import decimal
import time
import sys
import threading
import can_interface
import gps_interface
import nova_interface
import config
import api_engine
from config import ConfigStore



def truncate(num):
    return float(decimal.Decimal(num).quantize(decimal.Decimal('.0001'), rounding=decimal.ROUND_DOWN))

class FleetMonitorApp:
    def __init__(self):

    def startup(self):
        result = True

        vehicle = api_engine.get_vehicle()
        ConfigStore().set_vehicle(vehicle)

        # Check for PiCAN connection
        try:
            self.can = can_interface.CanHandler()
            if not self.can.startup():
                return False
        except:
            # log_and_warn(
            return False

        # Check for GPS connection
        try:
            self.gps = gps_interface.GPSHandler()
            if not self.gps.setup():
                return False
        except:
            # log_and_warn(
            return False

    def run(self):
        try:
            self.can.start()
            self.gps.start()
            self.can.join(None)
            self.gps.join(None)
        except:
            pass
        self.can.shutdown()



def main():
    app = FleetMonitorApp()
    if app.startup():
        app.run()

if __name__ == "__main__":
    main()
