import gps
import time
from api_engine import API_Engine
from threading import Thread

class GPSHandler(Thread):
    def __init__(self):
        super(GPSHandler, self).__init__()
        self.api_engine = API_Engine()

    def startup(self):
        self.session = gps.GPS("localhost", "2947")
        self.session.stream(gps.WATCH_ENABLE | gps.WATCH_NEWSTYLE)
        return True
		
    def run(self):
        while True:
            time.sleep(1)
            report = self.session.next()
            if report['class'] == 'TPV':
                self.api_engine.pos_send(report.lat, report.lon)

def main():
    gps = GPSHandler()
    gps.api_engine.set_logging(True)
    gps.api_engine.set_send(False)
    if gps.startup():
        gps.start()
        gps.api_engine.start()

if __name__ == "__main__":
    main()
