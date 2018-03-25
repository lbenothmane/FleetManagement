import gps
import time
import api_engine
from threading import Thread

class GPSHandler(Thread):
    def __init__(self):
        super(GPSHandler, self).__init__()
        self.lat = 0.0
        self.lon = 0.0

    def startup(self):
        session = gps.GPS("localhost", "2947")
        session.stream(gps.WATCH_ENABLE | gps.WATCH_NEWSTYLE)
        return True

    def call_api(self):
        while True:
            api_engine.send_pos(self.lat, self.lon)
            time.sleep(5)

    def run(self):
        while True:
            try:
                time.sleep(1)
                if report['class'] == 'TPV':
                    if hasattr(report, 'lat'):
                        self.lat = report.lat
                    if hasattr(report, 'lon'):
                        self.lon = report.lon
            except KeyError:
                pass
            except KeyboardInterrupt:
                print("")
                quit()
            except StopIteration:
                quit()
