import GoogleAuthService from '../services/GoogleAuthService.js';
import GoogleSelectService from '../services/GoogleSelectService.js';
import VolunteerService from '../services/VolunteerService.js';
import GuestService from '../services/GuestService.js';
import OtherService from '../services/OtherService.js';
import GetDataRowService from '../services/GetDataRowService.js';
import tableTypes from '../models/tableTypes.js';
import { convertEventId } from '../utils/ConvertEventId.js';

class GoogleSheetsRepository {
  async getVolunteers(authClient) {
    try {
      let row = 2;
      const lastRow = await GetDataRowService.getLastRow(tableTypes.volunteers);
      if (lastRow) {
        row = lastRow;
      }
      const { result: volunteers, initialRow } = await GoogleSelectService.getSheetList(
        authClient, tableTypes.volunteers, row, 'C', 'C',
      );

      if (!volunteers || !volunteers.length) {
        console.log('Volunteers DB data is present');
        return;
      }

      const volunteersList = volunteers
      .map((v, index) => ({
        volunteer_id: v[0] || null,
        volunteer_row: index + initialRow,
      }))
      .filter(v => v.volunteer_id);

      if (!volunteersList.length ) {
        console.log('Volunteers DB data is present');
        return;
      }

      const newLastRow = volunteersList[volunteersList.length - 1].volunteer_row + 1;
      if (lastRow) {
        await GetDataRowService.updateLastRow(tableTypes.volunteers, newLastRow);
      } else {
        await GetDataRowService.addLastRow(tableTypes.volunteers, newLastRow);
      }

      await VolunteerService.addVolunteers(volunteersList);
      console.log('Volunteers DB updated successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async getGuests(authClient) {
    try {
      let row = 3;
      const lastRow = await GetDataRowService.getLastRow(tableTypes.guests);
      if (lastRow) {
        row = lastRow;
      }
      const { result: guests, initialRow } = await GoogleSelectService.getSheetList(
        authClient, tableTypes.guests, row, 'A', 'A',
      );

      if (!guests || !guests.length) {
        console.log('Guests DB data is present');
        return;
      }

      const guestsList = guests
      .map((g, index) => ({
        guest_id: g[0] || null,
        guest_row: index + initialRow,
      }))
      .filter(g => g.guest_id);

      if (!guestsList.length ) {
        console.log('Guests DB data is present');
        return;
      }

      const newLastRow = guestsList[guestsList.length - 1].guest_row + 1;
      if (lastRow) {
        await GetDataRowService.updateLastRow(tableTypes.guests, newLastRow);
      } else {
        await GetDataRowService.addLastRow(tableTypes.guests, newLastRow);
      }

      await GuestService.addGuests(guestsList);
      console.log('Guests DB updated successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async getForm(authClient) {
    try {
      let row = 2;
      const lastRow = await GetDataRowService.getLastRow(tableTypes.Form);
      if (lastRow) {
        row = lastRow;
      }
      const { result: formData, initialRow } = await GoogleSelectService.getSheetList(
        authClient, tableTypes.Form, row, 'B', 'I',
      );

      if (!formData || !formData.length) {
        return;
      }

      const formDataList = formData
      .map((f, index) => ({
        form_row: index + initialRow,
        guest_id: f[0] || null,
        ...convertEventId(f),
      }))
      .filter(g => g.guest_id);

      if (!formDataList.length ) {
        return;
      }

      const newLastRow = formDataList[formDataList.length - 1].form_row + 1;
      if (lastRow) {
        await GetDataRowService.updateLastRow(tableTypes.Form, newLastRow);
      } else {
        await GetDataRowService.addLastRow(tableTypes.Form, newLastRow);
      }

      await GuestService.updateGuestEvents(formDataList);
      console.log('Guests DB updated by Form');
    } catch (err) {
      console.log(err);
    }
  }

  async getOther(authClient) {
    try {
      let row = 2;
      const tableName = tableTypes.other.other;
      const lastRow = await GetDataRowService.getLastRow(tableName);
      if (lastRow) {
        row = lastRow;
      }
      const { result: guests, initialRow } = await GoogleSelectService.getSheetList(
        authClient, tableName, row, 'A', 'A',
      );

      if (!guests || !guests.length) {
        console.log('Other DB data is present');
        return;
      }

      const guestsList = guests
      .map((g, index) => ({
        guest_id: g[0] || null,
        guest_row: index + initialRow,
      }))
      .filter(g => g.guest_id);

      if (!guestsList.length ) {
        console.log('Other DB data is present');
        return;
      }

      const newLastRow = guestsList[guestsList.length - 1].guest_row + 1;
      if (lastRow) {
        await GetDataRowService.updateLastRow(tableName, newLastRow);
      } else {
        await GetDataRowService.addLastRow(tableName, newLastRow);
      }

      await OtherService.addGuests(guestsList, tableName);
      console.log('Other DB updated successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async getPress(authClient) {
    try {
      let row = 2;
      const tableName = tableTypes.other.press;
      const lastRow = await GetDataRowService.getLastRow(tableName);
      if (lastRow) {
        row = lastRow;
      }
      const { result: guests, initialRow } = await GoogleSelectService.getSheetList(
        authClient, tableName, row, 'B', 'B',
      );

      if (!guests || !guests.length) {
        console.log('Press DB data is present');
        return;
      }

      const guestsList = guests
      .map((g, index) => ({
        guest_id: g[0] || null,
        guest_row: index + initialRow,
      }))
      .filter(g => g.guest_id);

      if (!guestsList.length ) {
        console.log('Press DB data is present');
        return;
      }

      const newLastRow = guestsList[guestsList.length - 1].guest_row + 1;
      if (lastRow) {
        await GetDataRowService.updateLastRow(tableName, newLastRow);
      } else {
        await GetDataRowService.addLastRow(tableName, newLastRow);
      }

      await OtherService.addGuests(guestsList, tableName);
      console.log('Press DB updated successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async getLocalPress(authClient) {
    try {
      let row = 3;
      const tableName = tableTypes.other.local_press;
      const lastRow = await GetDataRowService.getLastRow(tableName);
      if (lastRow) {
        row = lastRow;
      }
      const { result: guests, initialRow } = await GoogleSelectService.getSheetList(
        authClient, tableName, row, 'B', 'B',
      );

      if (!guests || !guests.length) {
        console.log('Local Press DB data is present');
        return;
      }

      const guestsList = guests
      .map((g, index) => ({
        guest_id: g[0] || null,
        guest_row: index + initialRow,
      }))
      .filter(g => g.guest_id);

      if (!guestsList.length ) {
        console.log('Local Press DB data is present');
        return;
      }

      const newLastRow = guestsList[guestsList.length - 1].guest_row + 1;
      if (lastRow) {
        await GetDataRowService.updateLastRow(tableName, newLastRow);
      } else {
        await GetDataRowService.addLastRow(tableName, newLastRow);
      }

      await OtherService.addGuests(guestsList, tableName);
      console.log('Local Press DB updated successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async getStaff(authClient) {
    try {
      let row = 2;
      const tableName = tableTypes.other.staff;
      const lastRow = await GetDataRowService.getLastRow(tableName);
      if (lastRow) {
        row = lastRow;
      }
      const { result: guests, initialRow } = await GoogleSelectService.getSheetList(
        authClient, tableName, row, 'B', 'B',
      );

      if (!guests || !guests.length) {
        console.log('Staff Press DB data is present');
        return;
      }

      const guestsList = guests
      .map((g, index) => ({
        guest_id: g[0] || null,
        guest_row: index + initialRow,
      }))
      .filter(g => g.guest_id);

      if (!guestsList.length ) {
        console.log('Staff Press DB data is present');
        return;
      }

      const newLastRow = guestsList[guestsList.length - 1].guest_row + 1;
      if (lastRow) {
        await GetDataRowService.updateLastRow(tableName, newLastRow);
      } else {
        await GetDataRowService.addLastRow(tableName, newLastRow);
      }

      await OtherService.addGuests(guestsList, tableName);
      console.log('Staff Press DB updated successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async getOrganizators(authClient) {
    try {
      let row = 2;
      const tableName = tableTypes.other.organizators;
      const lastRow = await GetDataRowService.getLastRow(tableName);
      if (lastRow) {
        row = lastRow;
      }
      const { result: guests, initialRow } = await GoogleSelectService.getSheetList(
        authClient, tableName, row, 'A', 'A',
      );

      if (!guests || !guests.length) {
        console.log('Organizators Press DB data is present');
        return;
      }

      const guestsList = guests
      .map((g, index) => ({
        guest_id: g[0] || null,
        guest_row: index + initialRow,
      }))
      .filter(g => g.guest_id);

      if (!guestsList.length ) {
        console.log('Organizators Press DB data is present');
        return;
      }

      const newLastRow = guestsList[guestsList.length - 1].guest_row + 1;
      if (lastRow) {
        await GetDataRowService.updateLastRow(tableName, newLastRow);
      } else {
        await GetDataRowService.addLastRow(tableName, newLastRow);
      }

      await OtherService.addGuests(guestsList, tableName);
      console.log('Organizators Press DB updated successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async getUpdates() {
    try {
      const authClient = await GoogleAuthService.authorize();
      await this.getVolunteers(authClient);
      await this.getGuests(authClient);
      await this.getPress(authClient);
      await this.getLocalPress(authClient);
      await this.getStaff(authClient);
      await this.getOther(authClient);
      await this.getOrganizators(authClient);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new GoogleSheetsRepository();
