export const normalizeHeaderValue = (value) => value.trim().replace(/\s+/g, ' ');

export const parseHeadersBlocks = (headersText) => {
  const blocks = new Map();
  const lines = headersText.replace(/\r/g, '').split('\n');
  let currentPattern = null;
  let currentHeaders = new Map();

  const commitBlock = () => {
    if (!currentPattern) return;
    blocks.set(currentPattern, new Map(currentHeaders));
  };

  for (const line of lines) {
    if (!line.trim()) {
      commitBlock();
      currentPattern = null;
      currentHeaders = new Map();
      continue;
    }

    if (!line.startsWith(' ') && !line.startsWith('\t')) {
      commitBlock();
      currentPattern = line.trim();
      currentHeaders = new Map();
      continue;
    }

    if (!currentPattern) continue;

    const trimmedLine = line.trim();
    const separatorIndex = trimmedLine.indexOf(':');
    if (separatorIndex === -1) continue;

    const headerName = trimmedLine.slice(0, separatorIndex).trim().toLowerCase();
    const headerValue = normalizeHeaderValue(trimmedLine.slice(separatorIndex + 1));
    currentHeaders.set(headerName, headerValue);
  }

  commitBlock();

  return blocks;
};
