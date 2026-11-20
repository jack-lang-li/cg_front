export function filterDevices(devices, nameKeyword = '', status = '') {
  const keyword = nameKeyword.trim();

  return devices.filter((device) => {
    const matchesName = device.name.includes(keyword);
    const matchesStatus = status === '' || device.status === status;

    return matchesName && matchesStatus;
  });
}

export function getDeviceNames(devices) {
  return devices.map((device) => device.name);
}

export function findDeviceById(devices, id) {
  return devices.find((device) => device.id === id);
}

export function countDevicesByStatus(devices) {
  const counts = { running: 0, stopped: 0 };

  devices.forEach((device) => {
    counts[device.status] += 1;
  });

  return counts;
}

const defaultDeviceQuery = {
  nameKeyword: '',
  status: '',
};

export function createDeviceQuery() {
  return { ...defaultDeviceQuery };
}

export async function queryDevicesAsync(
  devices,
  nameKeyword = '',
  status = '',
  shouldFail = false,
) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (shouldFail) {
    throw new Error('查询失败');
  }

  return filterDevices(devices, nameKeyword, status);
}