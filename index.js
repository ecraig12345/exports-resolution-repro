(async () => {
  console.log('this should log "default" due to incorrect exports map ordering:');
  await import('incorrect-exports-map');

  console.log();
  await import('exports-folders');
  await import('exports-folders/wildcard/file.js');

  console.log();
  try {
    await import('exports-folders/folder/file.js');
    throw new Error("shouldn't get here in node 18+");
  } catch (err) {
    if (err.message?.includes('not defined by "exports"')) {
      console.log('got expected error importing exports-folders/folder/file.js');
    } else {
      console.error('unexpected error importing exports-folders/folder/file.js:', err.message);
    }
  }
})().catch(err => {
  console.error('unexpected error:', err.message);
  process.exit(1);
});
