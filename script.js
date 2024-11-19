const ava = document.getElementById('user_avatar')
const uName = document.getElementById('userName').firstChild
const frNumber = document.getElementById('followers_number')
const fgNumber = document.getElementById('following_number')
const bio = document.getElementById('bio')

const searchIn = document.getElementById('searchInput');
const searchBut = document.getElementById('searchButton');

const fr = document.getElementById('followers')
const fg = document.getElementById('following')
const siteA = document.querySelector('#site a')
const siteImg = document.querySelector('#site img')

const repoInfoContainer = document.querySelector(".repoInfo")

function createComponent(repoName, repoDesc, repoLang, repoLink) {
    const name = document.createElement('a')
    name.target = "_blank"
    name.href = repoLink
    name.id = 'repoName'
    const txt = document.createTextNode(repoName)
    name.appendChild(txt)

    const desc = document.createElement('p')
    desc.id = 'repoDesc'
    const descTxt = document.createTextNode(repoDesc)
    desc.appendChild(descTxt)

    const lang = document.createElement('p')
    lang.id = 'repoLang'
    const langTxt = document.createTextNode(`● ${repoLang}`)
    lang.appendChild(langTxt)

    const container = document.createElement('div')
    container.classList = 'repoCard'

    container.append(name)
    container.append(desc)
    container.append(lang)
    return container;
}

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
            siteA.innerText = y.blog || 'N/A'
            siteA.href = y.blog || '#'
            
            fetch(y.repos_url).then(res => res.json()).then(data => {
                data.map((item, idx) => (
                    repoInfoContainer.appendChild(createComponent(item.name, item.description, item.language, item.html_url))
                )) 
            })
        }

    )

    fr.firstChild.href = `https://github.com/${searchIn.value}?tab=followers`
    fg.firstChild.href = `https://github.com/${searchIn.value}?tab=following`
}

