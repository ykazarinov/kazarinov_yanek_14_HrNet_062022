const today = new Date()
const conf = {employeeMinAge: 18,};
const transcription = [
    {   lang: 'English',
        data : {
            footer : [
                'Choose language',
            ],
            header : [
                'Sign In',
                'Sign out'
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
                'Cancel',
                'Email',
                'Phone',
                'Photo'
            ],
            signin: [
                'Sign In',
                'Email',
                'Password',
                'Remember me',
                'Sign In'
            ],
            employees: [
                'Employees',
                {
                'photo': 'Photo',
                'firstName': 'First name',
                'lastName': 'Last name',
                'email': 'Email',
                'phone': 'Phone',
                'birthday': 'Birthday',
                'startday': 'Startday',
                'street': 'Street',
                'city': 'City',
                'state': 'State',
                'zipcode': 'Zip code',
                'department': 'Department'
                },
                'Show',
                'All',
                'entries',
                'Search',
                'Showing',
                'to',
                'of',
                'entries',
                'Previous',
                'Next',
                'The search returned no results.',
            ]
        }
    },
    {   lang: 'Français',
        data : {
            footer: [
                'Choisissez la langue',
            ],
            header: [
                'Connexion',
                'Déconnexion'
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
                'Annuler',
                'E-mail',
                'Téléphone',
                'Photo'
            ],
            signin: [
                'S\'identifier',
                'E-mail',
                'Mot de passe',
                'Souviens-toi de moi',
                'S\'identifier'
            ],
            employees: [
                'Des employés',
                {
                'photo': 'Photo',
                'firstName': 'Prénom',
                'lastName': 'Nom',
                'email': 'E-mail',
                'phone': 'Téléphon',
                'birthday': 'Date de naissance',
                'startday': 'Commence jour',
                'street': 'Rue',
                'city': 'Ville',
                'state': 'État',
                'zipcode': 'Code postal',
                'department': 'Département'
                },
                'Montrer',
                'Tout',
                'entrées',
                'Chercher',
                'Montrer',
                'à',
                'de',
                'entrées',
                'Précédent',
                'Prochain',
                'La recherche n\'a donné aucun résultat.',
            ]
        }
    }
]

export { today, conf, transcription };