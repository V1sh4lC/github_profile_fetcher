const ava = document.getElementById('user_avatar')
const uName = document.getElementById('userName').firstChild
const frNumber = document.getElementById('followers_number')
const fgNumber = document.getElementById('following_number')
const bio = document.getElementById('bio')

const searchIn = document.getElementById('searchInput');
const searchBut = document.getElementById('searchButton');

const fr = document.getElementById('followers')
const fg = document.getElementById('following')

searchBut.onclick = () => {
    fetch(`https://api.github.com/users/${searchIn.value}`).then(
        x => x.json()
    ).then(
        y => {
            ava.src = y.avatar_url;
            uName.innerText = y.name;
            uName.href = y.html_url;
            // frNumber.innerText = y.followers
            if (y.followers > 1000) {
                frNumber.innerText = Math.round(y.followers/1000) + "k"
            } else {
                frNumber.innerText = y.followers;
            }
            fgNumber.innerText = y.following
            bio.innerText = y.bio
        }

    )

    fr.firstChild.href = `https://github.com/${searchIn.value}?tab=followers`
    fg.firstChild.href = `https://github.com/${searchIn.value}?tab=following`
}