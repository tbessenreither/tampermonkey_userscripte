// ==UserScript==
// @name         youtube-fuck-all-those-videos
// @namespace    http://adt-it.de/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/
// @grant        none
// @updateURL   https://raw.githubusercontent.com/tbessenreither/tampermonkey_userscripte/main/fuckthoseytvideos.js
// @downloadURL https://raw.githubusercontent.com/tbessenreither/tampermonkey_userscripte/main/fuckthoseytvideos.js
// ==/UserScript==

function wait(ms) {
	return new Promise((resolve)=>{
		setTimeout(resolve, ms);
	});
}

async function dismissCurrent() {
    let clickedSomething = false;
    let foundAusblenden = false;
	for (const item of document.querySelectorAll('tp-yt-iron-dropdown ytd-menu-service-item-renderer yt-formatted-string')) {
		if (item.textContent.includes("Kein Interesse")) {
            clickedSomething = true;
			item.click();
		} else if (item.textContent.includes("Ausblenden")) {
			foundAusblenden = item;
		}
	}
    if (!clickedSomething && foundAusblenden !== false) {
        foundAusblenden.click();
    }
	return true;
}
async function dismissAll() {
    let list = document.querySelectorAll('ytd-rich-grid-media button[aria-label="Aktionsmenü"]');
    for(let item of list) {
        item.click();
		await wait(100);
        await dismissCurrent();
		await wait(200);
    }
    window.location.reload();
}

dismissAll();
