interface SecBox {
  id: number;
  version: number;
  name: string;
  enabled: boolean;
  relay_timeout: number;
  door_sensor_enabled: boolean;
  door_sensor_idle: boolean;
  auto_close_enabled: number;
}
