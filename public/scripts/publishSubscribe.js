const channels = {};

export const on = (event, funct) => {
  const channel = getChannel(event, true);
  channel.push({ call: funct, i: channel.length });

  return channel.length - 1;
};

export const emit = (event, data) => {
  const channel = getChannel(event);
  runCalls(channel, data, true);
};

export const once = (event, data) => {
  const channel = getChannel(event);
  runCalls(channel, data);
};

const runCalls = (calls, data, retry = false, i = 0, runMax = 5) => {
  const failed = calls.filter((c) => {
    return c.call(data) === false;
  });

  if (failed.length > 0 && retry && i < runMax) {
    i++;
    runCalls(failed, data, i, runMax);
  } else {
    return failed.length === 0;
  }
};

export const unsubscribe = (event, index) => {
  const channel = getChannel(event);
  const filteredChannel = channel.filter((c) => c.id !== index);
  channel[event] = filteredChannel;
};

const getChannel = (event, create = false) => {
  let channel = channels[event];
  if (create && channel === undefined) {
    channels[event] = [];
    channel = channels[event];
  }

  return channel;
};
