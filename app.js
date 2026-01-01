// 1️⃣4️⃣ last line of app.js
// 1️⃣1️⃣ nextTick (top-level)
// 1️⃣3️⃣ nextTick (separate)
// 🔟 nextTick inside nextTick
// 3️⃣ Promise.then (top-level)
// 8️⃣ Promise inside nextTick
// 2️⃣ nextTick inside Promise
// 9️⃣ nextTick inside Promise inside nextTick
// 1️⃣2️⃣ setTimeout 0ms (top-level)
// 1️⃣ setImmediate (top-level)
// 7️⃣ File read callback (sync part)
// 6️⃣ setImmediate inside readFile
// 5️⃣ timeout inside readFile
// 4️⃣ timeout inside timeout inside readFile

const fs = require("fs");
// -------------------- CHECK PHASE --------------------
setImmediate(() => console.log("1️⃣ setImmediate (top-level)")); // a() called  (10)

// -------------------- PROMISE (MICROTASK) --------------------
Promise.resolve().then(() => {
  // b() called
  process.nextTick(() => console.log("2️⃣ nextTick inside Promise")); // h() called   (7)
  console.log("3️⃣ Promise.then (top-level)"); // (5)
});

// -------------------- I/O (POLL PHASE) --------------------
fs.readFile("test.txt", "utf-8", (err, data) => {
  setTimeout(() => {
    //j()
    setTimeout(() => {
      console.log("4️⃣ timeout inside timeout inside readFile"); // (14)
    }, 0);
    console.log("5️⃣ timeout inside readFile"); // (13)
  }, 0);

  setImmediate(() => console.log("6️⃣ setImmediate inside readFile")); //k() called   (12)

  console.log("7️⃣ File read callback (sync part)"); // (11)
});

// -------------------- NEXT TICK QUEUE --------------------
process.nextTick(() => {
  // c() (called)
  Promise.resolve().then(() => {
    // f()
    console.log("8️⃣ Promise inside nextTick"); //(6)
    process.nextTick(
      () =>
        // i() called
        console.log("9️⃣ nextTick inside Promise inside nextTick") // (8)
    );
  });

  process.nextTick(() => console.log("🔟 nextTick inside nextTick")); //g() called (4)
  console.log("1️⃣1️⃣ nextTick (top-level)"); // (2)
});

// -------------------- TIMERS --------------------
setTimeout(() => console.log("1️⃣2️⃣ setTimeout 0ms (top-level)"), 0); //d() called (9)

process.nextTick(() => console.log("1️⃣3️⃣ nextTick (separate)")); // e() called (3)

console.log("1️⃣4️⃣ last line of app.js"); // (1)
