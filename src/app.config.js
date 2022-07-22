const today = new Date()
const conf = {employeeMinAge: 18,};
const transcription = [
    {   lang: 'En',
        data : {
            header : [
                'Choose language',
            ],
            addemployee: [
                'Create Employee',
                'First Name',
                'Last Name',
                'Date of Birth',
                'Start Date',
                'Address',
                'Street',
                'City',
                'State',
                'Zip Code',
                'Department',
                'Save',
                'Cancel'
            ],
            signin: [
                'Sign In',
                'Email',
                'Password',
                'Remember me',
                'Sign In'
            ]
        }
    },
    {   lang: 'Fr',
        data : {
            header: [
                'Choisissez la langue',
            ],
            addemployee: [
                'Créer un employé',
                'Prénom',
                'Nom de famille',
                'Date de naissance',
                'Date de début',
                'Adresse',
                'Rue',
                'Ville',
                'État',
                'Code postal',
                'Département',
                'Sauvegarder',
                'Annuler'
            ],
            signin: [
                'S\'identifier',
                'E-mail',
                'Mot de passe',
                'Souviens-toi de moi',
                'S\'identifier'
            ]
        }
    }
]

export { today, conf, transcription };