const ID_LENGTH = 9;

class QrValidation {
  prepareQrData(decodedText, tableName) {
    let [id, row, sheet] = decodedText.split('_');
    if (!id || !row || !sheet) {
      return 'Failed to scan QR';
    }
    if (sheet !== tableName) {
      return 'Wrong QR Origin';
    }
    const rowIndex = row[0];

    if (rowIndex !== 'A' || id.length !== ID_LENGTH) {
      return 'Incorrect QR';
    }

    row = row.slice(1);

    return { id, row, sheet };
  }
}

export default new QrValidation();
