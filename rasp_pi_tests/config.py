default_vehicle = {'vid': 5, 'did': 10, 'pids': [0x0D, 0x2F, 0x04, 0x05], 'bitrate': 500000}

default_server = {'uri':  'http://35.193.191.2:8080'}

default_mode = "test"

class ConfigStore:
    class __Singleton:
        def __init__(self):
            pass
    instance = None

    def __init__(self):
        if not ConfigStore.instance:
            ConfigStore.instance = ConfigStore.__Singleton()
            self.instance.vehicle = default_vehicle
            self.instance.server = default_server
            self.instance.mode = default_mode

    def get_pids(self):
        if 'pids' in self.instance.vehicle:
            return self.instance.vehicle['pids']
        else:
            return default_vehicle['pids']

    def get_vid(self):
        if 'vid' in self.instance.vehicle:
            return str(self.instance.vehicle['vid'])
        else:
            return str(default_vehicle['vid'])

    def get_did(self):
        if 'did' in self.instance.vehicle:
            return str(self.instance.vehicle['did'])
        else:
            return str(default_vehicle['did'])

    def get_bitrate(self):
        if 'bitrate' in self.instance.vehicle:
            return self.instance.vehicle['bitrate']
        else:
            return default_vehicle['bitrate']

    def get_server_uri(self):
        if 'uri' in self.instance.server:
            return self.instance.server['uri']
        else:
            return default_server['uri']

    def set_vehicle(self, vehicle):
        if 'pids' in vehicle:
            pids = []
            for pid in vehicle['pids']:
                if 'pid' in pid and pid['pid'] not in pids:
                    pids.append(pid['pid'])
            vehicle['pids'] = pids
        self.instance.vehicle = vehicle

    def set_server(self, server):
        self.instance.server = server
