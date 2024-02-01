/*

const container = document.querySelector('.container');
const jsonFilePath = 'assets/js/data.json';

let comments = JSON.parse(localStorage.getItem('commentEntries')) || [];

function saveCommentToLocalStorage(){
    return localStorage.setItem('commentEntries',JSON.stringify(comments));
}

let currentUserArray = JSON.parse(localStorage.getItem('user')) || [];

function saveUserToLocalStorage(){
    return localStorage.setItem('user',JSON.stringify(currentUserArray));
}


async function fetchData(){
    const response = await fetch('assets/js/data.json')
    const data = await response.json();
    return data;
}

async function currentUser(){
    const data = await fetchData()
    console.log(data)
    currentUserArray.push(
        {
            currentUserImage: data.currentUser.image.png,
            currentUserUserName: data.currentUser.username
        }
    )
    saveUserToLocalStorage();
}

async function getComments(){
    const data = await fetchData()
    for (const comment of data.comments) {
        comments.push(
            {
                content: comment.content,
                createdAt: comment.createdAt,
                replies: comment.replies,
                score: comment.score,
                userImage: comment.user.image.png,
                username: comment.user.username,
    
            }
        )
        saveCommentToLocalStorage();
    }
}*/

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form');
    const yorumAlanı = document.getElementById('comment');
    const yorumListesi = document.querySelector('.container');

    // Yorumları yükler
    yorumlarıYükle();

    // Yorum gönderme işlemini dinler
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const yorum = yorumAlanı.value.trim();
        if (yorum) {
            yorumEkle(yorum);
            yorumAlanı.value = '';
        }
    });

    function yorumlarıYükle() {
        const kaydedilenYorumlar = JSON.parse(localStorage.getItem('yorumlar') || '[]').reverse();
        kaydedilenYorumlar.forEach(yorum => {
            yorumListesineEkle(yorum);
        });
    }

    function yorumEkle(yorum) {
        yorumListesineEkle(yorum);
        
        // Yorumları sakla
        const kaydedilenYorumlar = JSON.parse(localStorage.getItem('yorumlar') || '[]');
        kaydedilenYorumlar.push(yorum);
        localStorage.setItem('yorumlar', JSON.stringify(kaydedilenYorumlar));
    }

    function yorumListesineEkle(yorum) {
        // Yorum yapısını oluştur
        const yorumDiv = document.createElement('div');
        yorumDiv.classList.add('comments-div');

        const yorumIcerik = `
            <div class="rating-box">
                <button class="like-button plus">+</button>
                <span class="like-counter">0</span>
                <button class="like-button minus">-</button>
            </div>
            <div class="comment-container">
                <div class="profile-container">
                    <div class="profile">
                        <img class="profile-pic" src="assets/img/amyrobson.png" alt="">
                        <span class="name">Yeni Kullanıcı</span>
                        <span class="created-time">şimdi</span>
                    </div>
                    <button class="reply">
                        <img src="assets/img/reply.svg" alt="">
                        <span>Reply</span> 
                    </button>
                </div>
                <p class="comment">${yorum}</p>
            </div>`;

        yorumDiv.innerHTML = yorumIcerik;

        // Yorumu container'ın başına ekle
        const ilkYorum = yorumListesi.firstChild;
        if (ilkYorum) {
            yorumListesi.insertBefore(yorumDiv, ilkYorum);
        } else {
            yorumListesi.appendChild(yorumDiv);
        }
    }
});

