interface User {
  id: number;
  registration: string;
  name: string;
  password: string;
  salt: string;
  user_type_id: number;
  begin_time: number;
  end_time: number;
  image_timestamp: number;
  last_access: number;
}
