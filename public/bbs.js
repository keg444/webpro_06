// 何をやろう
// +機能1 リプライ
// +機能2 送信と同時に投稿チェック ok
// +機能3 投稿した順番を表示ok
// +機能4 投稿を削除
// +機能5 ブックマークとか
"use strict";

let number=0;
const bbs = document.querySelector('#bbs');

// 投稿したとき
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value; 
    const message = document.querySelector('#message').value;   //投稿者とメッセージを取得

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );  //デバッグ用のconsole.log
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
        checkPosts();  // 投稿と同時にチェックして表示
    });
});

// 投稿チェックしたとき
// document.querySelector('#check').addEventListener('click', () => {
//     const params = {  // URL Encode
//         method: "POST",
//         body:  '',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };
//     const url = "/check";
//     fetch( url, params )
//     .then( (response) => {
//         if( !response.ok ) {
//             throw new Error('Error');
//         }
//         return response.json();
//     })
//     .then( (response) => {
//         let value = response.number;
//         console.log( value );

//         console.log( number );
//         if( number != value ) { //  クライアントが持ってる件数とサーバから受け取った件数が違うとき
//             const params = {
//                 method: "POST",
//                 body: 'start='+number,
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'               
//                 }
//             }
//             const url = "/read";
//             fetch( url, params )
//             .then( (response) => {
//                 if( !response.ok ) {
//                     throw new Error('Error');
//                 }
//                 return response.json();
//             })
//             .then( (response) => {
//                 number += response.messages.length; 
//                 for( let mes of response.messages ) {   // 表示→次の番号のデータ表示
//                     console.log( mes );  // 表示する投稿

//                     let cover = document.createElement('div');
//                     cover.className = 'cover';

//                     // 名前の表示
//                     let name_area = document.createElement('span');
//                     name_area.className = 'name';
//                     name_area.innerText = mes.name;

//                     // メッセージの表示
//                     let mes_area = document.createElement('span');
//                     mes_area.className = 'mes';
//                     mes_area.innerText = mes.message;

//                     // 投稿順の表示
//                     let order_area = document.createElement('span');
//                     order_area.className = 'order';
//                     order_area.innerText = `${number}`;

//                     // 削除ボタンの表示
//                     let del_btn = document.createElement('button');
//                     del_btn.className = 'del_button';
//                     del_btn.innerText = 'Delete';
//                     del_btn.addEventListener('click',() => {
//                         deletePost(mes.id, cover);
//                     });

//                     cover.appendChild(order_area);
//                     cover.appendChild( name_area );
//                     cover.appendChild( mes_area );
//                     cover.appenChile( del_btn);
//                     bbs.appendChild( cover );
//                 }
//             })
//         }
//     });
// });

// // 投稿削除関数
// function deletePost(postId, postElement) {
//     const params = {
//         method: "POST",
//         body: 'id=' + postId,
//         headers: {
//             'Content-Type': 'application/x-www,formwurlencoded'
//         }
//     };

//     const url = "/delete";
//     fetch(url, params)
//         .then((response) => {
//             if(!response.ok){
//                 throw new Error('Error');
//             }
//             return response.json();
//         })
//         .then((response) => {
//             if(response.success) {
//                 postElement.remove();
//             }else{
//                 console.error('Failed to delete post');
//             }
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// }

// 投稿チェック関数
function checkPosts() {
    const params = {  // URL Encode
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            let value = response.number;
            console.log(value);

            console.log(number);
            if (number != value) { // クライアントが持ってる件数とサーバから受け取った件数が違うとき
                const params = {
                    method: "POST",
                    body: 'start=' + number,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const url = "/read";
                fetch(url, params)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        for (let mes of response.messages) {   // 表示→次の番号のデータ表示
                            console.log(mes);  // 表示する投稿

                            let cover = document.createElement('div');
                            cover.className = 'cover';

                            // 名前の表示
                            let name_area = document.createElement('span');
                            name_area.className = 'name';
                            name_area.innerText = mes.name;

                            // メッセージの表示
                            let mes_area = document.createElement('span');
                            mes_area.className = 'mes';
                            mes_area.innerText = mes.message;

                            // 投稿順の表示
                            let order_area = document.createElement('span');
                            order_area.className = 'order';
                            order_area.innerText = `${number}`;

                            // // 削除ボタンの表示
                            // let del_btn = document.createElement('button');
                            // del_btn.className = 'del_button';
                            // del_btn.innerText = 'Delete';
                            // del_btn.addEventListener('click', () => {
                            //     deletePost(mes.id, cover);
                            // });

                            //  // リプライボタンの表示
                            // let reply_btn = document.createElement('button');
                            // reply_btn.className = 'reply_button';
                            // reply_btn.innerText = '返信する';
                            // reply_btn.addEventListener('click', () => {
                            //     // リプライ入力エリアの表示
                            //     let reply_area = document.createElement('div');
                            //     reply_area.className = 'reply-input-area';
 
                            //     let reply_input = document.createElement('input');
                            //     reply_input.className = 'reply-input';
                            //     reply_input.placeholder = '返信を書込';
 
                            //     let reply_submit = document.createElement('button');
                            //     reply_submit.className = 'reply-submit';
                            //     reply_submit.innerText = '送信';
                            //     reply_submit.addEventListener('click', () => {
                            //         const replyMessage = reply_input.value;
                            //         if (replyMessage) {
                            //             replyToPost(mes.id, replyMessage, cover);
                            //         }
                            //     });
 
                            //     reply_area.appendChild(reply_input);
                            //     reply_area.appendChild(reply_submit);
                            //     cover.appendChild(reply_area);
                            // });

                            let reply_btn = document.createElement('button');
                            reply_btn.className = 'reply_button';
                            reply_btn.innerText = 'Reply';
                            reply_btn.addEventListener('click', () => {
                                // リプライのテキストボックスにメッセージを表示
                                document.querySelector('#message').value = `>@${mes.name} `;
                            });

                            cover.appendChild(order_area);
                            cover.appendChild(name_area);
                            cover.appendChild(mes_area);
                            // cover.appendChild(del_btn); 
                            cover.appendChild(reply_btn) 
                            bbs.appendChild(cover);
                        }
                    });
            }
        });
}

// リプライ投稿関数
function replyToPost(postId, replyMessage, replyElement) {
    console.log('Replying to post with ID:', postId);  // デバッグ用
    console.log('Reply message:', replyMessage);  // デバッグ用
    const params = {
        method: "POST",
        body: 'id=' + postId + '&message=' + replyMessage,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/reply";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            if (response.success) {
                const replyArea = document.createElement('div');
                replyArea.className = 'reply-area';

                // リプライメッセージを表示
                const replyMessageElement = document.createElement('span');
                replyMessageElement.className = 'reply-message';
                replyMessageElement.innerText = replyMessage;

                replyMessageElement.style.fontSize = '0.8em';

                replyArea.appendChild(replyMessageElement);
                replyElement.appendChild(replyArea);
                console.log('Reply posted successfully');
            } else {
                console.error('Failed to post reply');
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
