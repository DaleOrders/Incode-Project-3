    const form = document.querySelector('form')
    const firstName = document.getElementById('firstname')
    const lastName = document.getElementById('lastname')
    const email = document.getElementById('email')

    form.addEventListener('submit', function () {

        const nameValidation = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i
        const emailValidation = /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/

        const validName = nameValidation.test(firstName.value)
        const validSurname = nameValidation.test(lastName.value)
        const validEmail = emailValidation.test(email.value)

        if (validName && validSurname && validEmail) {
            app.post('/users/new', (req, res) => {
                console.log(req.body)
                data.users.push(req.body)
                res.redirect('/users')
            })
        }
        else {
            alert('You have entered in the wrong details, please try again')
        }
    })