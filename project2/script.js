function playAudioByDataId(dataId) {
	//playaudio by data id
	const audioId = `myAudio${dataId}`;
	const audioDiv = document.getElementById(audioId);
	if (audioDiv) {
			audioDiv.currentTime = 0;
			audioDiv.play();
	}
}

setInterval(() => {
	const randomIndex = rnd(notificationsList.length);
	const notification = Notification(notificationsList[randomIndex]);
	//extracting audio id from array
	const audioid = notificationsList[randomIndex].audioid;

	playAudioByDataId(audioid);
	addNotification(notification);
}, 1000);


var template, notificationsList = [],
    baseClass = 'Notification',
    listElement = document.getElementsByClassName(baseClass + 's__List')[0],
    addBtn = document.getElementsByClassName(baseClass + 's__addBtn')[0],
    removeBtn = document.getElementsByClassName(baseClass + 's__removeBtn')[0],
    userName = '__ .-": .- . """"-.'

	
notificationsList.push({
	name: '/  */    *****',
	icon: 'images/ins.png',
	time: 'Now',
	title: userName,
	content: '____---.-.-.-.-(((-♯♯--(((---𝄫-----. . . . . . ____.-♯"-._',
	audioid: '1'
}, {
	name: ':_________`-;',
	icon:  'images/weibo.png',
	time: 'Now',
	title: userName,
	content: '-.____. . . .𝄫 . . . . . . ____.-.__--♯~- ,_.____. . . . . . . . . . ____.-"-.',
	audioid: '2'
}, {
	name: '|:.- .     """"',
	icon: 'images/red.png',
	time: 'Now',
	title: userName,
	content: '-____.-".-.-. .---.-.-.-.-𝄫.-.-.-♯.-.-.-.-.-.-.-.-.-.-♯-.-.-.-.-.-.-.-.-._-',
	audioid: '3'
}, {
	name: '_.-----.....___ .-": .- . """"-.',
	icon: 'images/wechat.png',
	time: 'Now',
	title: userName,
	content: '-.____. . . . . . . . . 𝄫. ____.-"-.____. . . . . . .♯ . . . ____.-"-♯.____. . . . . . . . . . ____.-',
	audioid: '4'
}, {
	name: '_.-----.....___ .-": .- . """"-.',
	icon: 'images/message.png',
	time: 'Now',
	title: userName,
	content: ' ,::////;𝄫::-.||||||𝄫|||.          .||||𝄫|||||.__ ,__||.__ ♯. ____.-"- ,♯::////;:♯:-.::_,__o ',
	audioid: '5'
})

template = (() => {
	let elm = document.getElementsByClassName('Notification')[0],
	    tmp = elm.cloneNode(true)
	
	tmp.classList.add(baseClass + '--Close')
	tmp.classList.add(baseClass + '--Optimize')
	
	elm.remove()
	
	listElement.innerHTML = ''
	
	return tmp
})()

function rnd (size) {
	return Number.parseInt((Math.random() * size))
}

function Notification (config = {}) {
	var element = template.cloneNode(true)
	
	function handler (klass, attr, value, child) {
		var tmp = element.getElementsByClassName(baseClass + klass)[0]
		
		if (typeof child === 'number') {
			tmp = tmp.children[child]
		}
		
		if (attr === 'value') {
			return tmp.innerText = value
		}
		
		return tmp.setAttribute(attr, value)
	}
	
	handler('__Icon', 'src', config.icon, 0)
	handler('__Name', 'value', config.name)
	handler('__Time', 'value', config.time)
	handler('__Title', 'value', config.title)
	handler('__Content', 'value', config.content)
	
	return element
}

function addNotification (notification, callback) {
	listElement.insertAdjacentElement('afterBegin', notification)
	
	setTimeout(() => {
		notification.classList.remove(baseClass + '--Close')
		setTimeout(() => {
			notification.classList.remove(baseClass + '--Optimize')
			
			if (typeof callback === 'function') callback()
		}, 875)
	}, 25)
}

function removeNotification (notification, callback) {
	notification.classList.add(baseClass + '--Optimize')
	notification.classList.add(baseClass + '--Close')
	
	setTimeout(() => {
		notification.remove()
		
		if (typeof callback === 'function') callback()
	}, 875)
	
}

function removeLastItem () {
	let notification, tmp
	
	tmp = document.getElementsByClassName(baseClass)
	
	for (let i = 0; i < tmp.length; i++) {
		if (!tmp[i].classList.contains(baseClass + '--Close')) {
			notification = tmp[i]
			break
		}
	}
	
	removeNotification(notification, () => {
		if (!listElement.children.length) {
			listElement.innerHTML = ''
		}
	})
}

addBtn.addEventListener('click', () => {
	addNotification(Notification(notificationsList[rnd(notificationsList.length)]))
})

removeBtn.addEventListener('click', removeLastItem)

{
	let c = 1, end = 20, operation = 'add'
	
	setInterval(() => {
		return
		
		if (operation === 'add') {
			addNotification(Notification(notificationsList[rnd(notificationsList.length)]))
		} else if (operation === 'remove') {
			removeLastItem()
		}
		
		if (c === 0) {
			operation = 'add'
		} else if (c === end) {
			operation = 'remove'
		}
		
		if (operation === 'add') {
			c++
		} else if (operation === 'remove') {
			c--
		}
	}, 875 / 6)
}