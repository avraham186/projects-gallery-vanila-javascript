'use strict'

galeryRender()
modalRender()
function galeryRender() {
    var portfolios = getPortfolio()
    var strHtml = portfolios.map(function (portfolio) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#${portfolio.id}">
                <div class="portfolio-hover"> <div class="portfolio-hover-content">
                    <i class="fa fa-plus fa-3x"></i> </div>
                </div><img class="img-fluid" src="${portfolio.imgUrl}"> </a>
                <div class="portfolio-caption"> <h4>${portfolio.title}</h4> <p class="text-muted">${portfolio.brand}</p>
                </div> </div>`
    }).join('')

    $('.porojectsContainer').html(strHtml)


}

function modalRender() {
    var portfolios = getPortfolio()
    var modalStr = portfolios.map(function (portfolio) {
       return `<div class="portfolio-modal modal fade" id=${portfolio.id} tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                ${portfolio.desc}
                <h2>${portfolio.title}</h2>
                <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                <img class="img-fluid d-block mx-auto" src="${portfolio.imgUrl}" alt="">
                <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                  blanditiis
                  dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae
                  cupiditate,
                  maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                <ul class="list-inline">
                  <li>${Date()}</li>
                  <li>${portfolio.url}</li>
                  <li>Client: Coding Academe</li>
                  <li>Category:Game Illustration</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
    }).join('')

    $('.modalToRender').html(modalStr)
}

function onSubmit() {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=avraham186@gmail.com&su=${$('input[name=Subject]').val()}&body=${$('textarea[name=text-area]').val()}%0D%0D%0D Sent from: ${$('input[name=Youre-Email]').val()}`, '_blank');
}

