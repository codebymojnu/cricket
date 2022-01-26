// click serch Btn
document.getElementById('searchBtn').addEventListener('click', function(){
    const userType = document.querySelector('#search').value;
    document.querySelector('.container2').innerHTML = '';
    document.querySelector('.container').style.display = 'none';
    dynamicFilter(userType);
})


document.getElementById('submit').addEventListener('click', function () {
    const name = document.querySelector('#name').value;
    const nickname = document.querySelector('#nickname').value;
    const highScore = document.querySelector('#highScore').value;
    const role = document.querySelector('#role').value;
    const birthPlace = document.querySelector('#birthPlace').value;
    const playerImgLink = document.querySelector('#playerImgLink').value;
    const bestBowling = document.querySelector('#bestBowling').value;
    const team = document.querySelector('#team').value;
    const phone = document.querySelector('#phone').value;
    const born = document.querySelector('#born').value;
    const bio = document.querySelector('#bio').value;
    const data = { name: name, nickname: nickname, highScore: highScore, role: role, birthPlace: birthPlace, playerImgLink: playerImgLink, bestBowling: bestBowling, team: team, phone: phone, born: born, bio: bio };
    postToServer(data);
    clearForm();
})

function clearForm(){
    document.querySelector('#name').value = '';
    document.querySelector('#nickname').value = '';
    document.querySelector('#highScore').value = '';
    document.querySelector('#role').value = '';
    document.querySelector('#birthPlace').value = '';
    document.querySelector('#playerImgLink').value = '';
    document.querySelector('#bestBowling').value = '';
    document.querySelector('#team').value = '';
    document.querySelector('#phone').value = '';
    document.querySelector('#born').value = '';
    document.querySelector('#bio').value = '';
}
// post data

function postToServer(postInfo) {
    fetch('https://radiant-reef-83234.herokuapp.com/api/addPlayer', {
        method: 'POST',
        body: JSON.stringify(postInfo),
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// load data
function loadData() {
    fetch('https://radiant-reef-83234.herokuapp.com/api/players')
        .then(response => response.json())
        .then(data => showUI(data));
}

function showUI(data) {
    for (let i = 0; i < data.length; i++) {
        const { nickname, highScore, bestBowling} = data[i];
        const element = data[i];
        const div = document.createElement('div');
        div.innerHTML = `<div class="box-container">
            <div class="box">
                <div class="area25"><span id="clickNickname${i}" class="nickname-area">${nickname}</span></div>
                <div class="area25">${highScore}</div>
                <div class="area25">${bestBowling}</div>
            </div>
        </div>`;
        document.querySelector('#playerList').appendChild(div);

        document.querySelector(`#clickNickname${i}`).addEventListener('click', function () {
            const nicknameValue = document.querySelector(`#clickNickname${i}`).innerHTML;
            displayNone();
            dynamicFilter(nicknameValue);
        })
    }
}

// Click Add Player

document.querySelector('#addPlayer').addEventListener('click', function () {
    document.querySelector('.container').style.display = 'block';
    document.getElementById("afterClick").style.display = "block";
    document.getElementById('playerList').style.display = "none";
    document.getElementById('addPlayer').style.display = "none";
    document.getElementById('submit-area').style.display = "flex";
    document.getElementById('searchPlayer').style.display = "none";
    document.querySelector('.container2').style.display = "none";
})

// click nickname and dynamic filter with nickname

function dynamicFilter(nicknameClick) {
    fetch(`https://radiant-reef-83234.herokuapp.com/api/${nicknameClick}`)
        .then(response => response.json())
        .then(playerData => showDetails(playerData))
}

// show specifce player details in UI

function showDetails(singlePlayerData) {
    const { name, birthPlace, nickname, highScore, bestBowling, role, playerImgLink, team, bio, born, phone } = singlePlayerData[0];
    const div2 = document.createElement('div');
    div2.innerHTML = `<div class="showDetails">
        <div class="first-grid">
            <div class="image-responsive">
                <img src=${playerImgLink}/>
            </div>
            <div class="nameAndTeam">
                <h3>${name}</h3>
                <div>${team}</div>
            </div>
        </div>
        <div class="personal-information-container">
            <div class="personal-information">
                <h3>Personal Information</h3>
                <div>Born: ${born}</div>
                <div>Birth Place: ${birthPlace}</div>
                <div>Role: ${role}</div>
                <div>Nick Name: ${nickname}</div>
                <div>Mobile: ${phone}</div>
            </div>
            <div class="scoreData">
                <div class="showScore">
                    <div></div>
                    <div>HS</div>
                    <div>Inn</div>
                    <div>Avg</div>
                    <div>SR</div>
                    <div>B. Bowl</div>
                    <div>4</div>
                    <div>6</div>
                </div>
                 <div class="showScore">
                    <div>T10</div>
                    <div>${highScore}</div>
                    <div>--</div>
                    <div>--</div>
                    <div>200</div>
                    <div>${bestBowling}</div>
                    <div>--</div>
                    <div>--</div>
                </div>
            </div>
        </div>
        <div class="last-grid">
            <div>${bio}</div>
        </div>
    </div>`;
    document.querySelector('.container2').appendChild(div2);
}

// after click nickname playerList Display None

function displayNone() {
    document.getElementById('playerList').style.display = "none";
}

loadData();