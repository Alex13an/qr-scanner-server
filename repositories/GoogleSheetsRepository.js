import GoogleAuthService from '../services/GoogleAuthService.js';
import GoogleVolunteerService from '../services/GoogleVolunteerService.js';
import VolunteerService from '../services/VolunteerService.js';

class GoogleSheetsRepository {
  async getVolunteers() {
    try {
      const authClient = await GoogleAuthService.authorize();
      const { result: volunteers, initialRow } = await GoogleVolunteerService.getVolunteerList(authClient);
      const volunteersList = volunteers
      .map((v, index) => ({
        volunteer_id: v[0] || null,
        volunteer_row: index + initialRow,
      }))
      .filter(v => v.volunteer_id);

      const currentList = await VolunteerService.getVolunteers();
      const newList = volunteersList.filter(v => !(currentList.some(cv => ('' + cv.volunteer_id) === v.volunteer_id)));
      if (newList.length > 0) {
        await VolunteerService.addVolunteers(newList);
        console.log('DB updated successfully');
        return;
      }
      console.log('DB data is present');
    } catch (err) {
      console.log(err);
    }
  }
}

export default new GoogleSheetsRepository();
