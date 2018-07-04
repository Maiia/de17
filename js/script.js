document.addEventListener("DOMContentLoaded", ready);

function ready() {
    function get(url) {
        return new Promise(function(succeed, fail) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.addEventListener("load", function() {
                if (request.status < 400)
                    succeed(request.response);
                else
                    fail(new Error("Request failed: " + request.statusText));
            });
            request.addEventListener("error", function() {
                fail(new Error("Network error"));
            });
            request.send();
        });
    }

    get('js/db.json').then(function(data) {
        data = JSON.parse(data);

        const blogItemTemplate = document.querySelector('#blog-item-template').content;
        const fragment = document.createDocumentFragment();
        const src = 'images/';

        data.forEach((item, i) => {
            const blogItem = blogItemTemplate.cloneNode(true);
            const dateSplitted= item.date.split(' ');
            blogItem.querySelector('.main-image img').setAttribute('src', src + item.img);
            blogItem.querySelector('.title a').textContent = item.title;
            blogItem.querySelector('.date span:nth-child(1)').textContent = dateSplitted[0];
            blogItem.querySelector('.date span:nth-child(2)').textContent = dateSplitted[1];
            blogItem.querySelector('.description').textContent = item.description;

            fragment.appendChild(blogItem);
        });
        document.querySelector('#blog-articles-listing').appendChild(fragment);

    }, function(error) {
        console.log("Error");
        console.log(error);
    });
}

document.querySelector('#scroll_bottom').addEventListener("click", () => {
    document.querySelector('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
