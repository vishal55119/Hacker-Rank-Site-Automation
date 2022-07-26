const url = "https://www.hackerrank.com/auth/login"

let email = 'vanogo1916@vsooc.com'
let password = 'vishal123'

const puppeteer = require('puppeteer')

const code = require('./code')

let page



let browserwillBeLaunchedPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args:['--start-maximized']
})


browserwillBeLaunchedPromise.then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage()
    return newTabPromise
}).then(function (newTab) {
    page = newTab
    let pageWillBeOpenedPromise = newTab.goto(url)
    return pageWillBeOpenedPromise
}).then(function () {
    let typeEmailPromise = page.type('input[id="input-1"]', email, { delay: 100 })
    return typeEmailPromise
}).then(function(){
    let typePasswordPromise = page.type('input[id="input-2"]',password,{delay:100})
    return typePasswordPromise
}).then(function(){
    let loginPromise = page.click('button[data-analytics="LoginPassword"]',{delay:100})
    return loginPromise
}).then(function(){
    let algoWillBeClickedPromise = waitAndClick('a[data-attr1="algorithms"]',page)
    return algoWillBeClickedPromise
}).then(function(){
    let warmUPWillBeClickedPromise = waitAndClick('input[value="warmup"]',page)
    return warmUPWillBeClickedPromise
}).then(function(){
    let challengesArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:100})
    // $$ = query selector all
    // $ = query selector
    // its a query selector of puppeteer
    return challengesArrPromise
}).then(function(questionsArr){
    console.log('No Of Questions ->>>>> ' + questionsArr.length)

    let questionWillBeSolvedPromise = questionSolver(page,questionsArr[0],code.answers[0])
    return questionWillBeSolvedPromise
})

function waitAndClick(selector,currrentPage){
    return new Promise(function(resolve,reject){
        let waitForModalPromise = currrentPage.waitForSelector(selector)
        waitForModalPromise.then(function(){
            let clickModalPromise = page.click(selector,{delay:100})
            return clickModalPromise
        }).then(function(){
            resolve()
        }).catch(function(){
            reject()
        })
    })
}

function questionSolver(page,question,answer){
    return new Promise(function(reolve,reject){
        let questionWillBeClickedPromise = question.click()
        questionWillBeClickedPromise.then(function(){
            return waitAndClick('.hr-monaco-editor-with-statusbar',page)
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('textarea[id="input-1"]')
        }).then(function(){
            return page.type('textarea[id="input-1"]',answer,{delay:30})
        }).then(function(){
            let ctrlOnHoldPromise = page.keyboard.down('Control')
            return ctrlOnHoldPromise
        }).then(function(){
            let AisPressedPromise = page.keyboard.press('A',{delay:30})
            return AisPressedPromise
        }).then(function(){
            let XisPressedPromise = page.keyboard.press('X',{delay:40})
            return XisPressedPromise
        }).then(function(){
            let ctrlIsReleasedPromise = page.keyboard.up('Control')
            return ctrlIsReleasedPromise
        }).then(function(){
            return waitAndClick('.hr-monaco-editor-with-statusbar',page)
        }).then(function(){
            let ctrlOnHoldPromise = page.keyboard.down('Control')
            return ctrlOnHoldPromise
        }).then(function(){
            let AisPressedPromise = page.keyboard.press('A',{delay:30})
            return AisPressedPromise
        }).then(function(){
            let VisPressedPromise = page.keyboard.press('V',{delay:30})
            return VisPressedPromise
        }).then(function(){
            let ctrlIsReleasedPromise = page.keyboard.up('Control')
            return ctrlIsReleasedPromise
        }).then(function(){
            return page.click('.hr-monaco__run-code',{delay:30})
        }).then(function(){
            resolve()
        }).catch(function(err){
            console.log(err)
        })
    })
}



