/**
 * sleeps for a bit then does something
 * @param timeToWait time to wait, in milliseconds
 * @param doAfter callback once the wait is done
 */
export async function doSomething(timeToWait: number, doAfter: () => void) {
  await new Promise((r) => setTimeout(r, timeToWait)); // using "setTimeout" to create a temporary 'sleep' function for TS
  doAfter();
}
