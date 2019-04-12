/**
 *
 * @param {Array} dataSource
 * @param {Array} newData
 * @return {Array}
 */
export default (dataSource, newData) => {

  for (const item of newData) {
    const index = dataSource.findIndex(datum => datum.id === item.id);
    if (index === -1) {
      dataSource.push(item);
    }
  }

  return dataSource;

}
