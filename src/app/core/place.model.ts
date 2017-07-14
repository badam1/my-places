import {enumerable, enumerableClassProperty} from '../shared/enumerable.decorator';
/**
 * Created by sarmasagigy on 2017. 07. 11..
 */

@enumerableClassProperty()
export class Place {
  name: string;
  ownerEmail: string;
  // position
  latitude: number;
  longitude: number;
  // address
  address: string;
  // details
  description: string;
  imagePath: string;
  phoneNumber: string;
  webUrl: string;
  openTime: number;
  closeTime: number;
  category: string;

  @enumerable(false)
  $key: string;
  // TODO Rating

  constructor(data?: Place) {
    if (data != null) {
      Object.assign(this, data);
      this.$key = data.$key;
    }
  }

}
