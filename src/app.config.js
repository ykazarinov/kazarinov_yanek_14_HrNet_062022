const API_REST_URL = process.env.REACT_APP_API_URL
//'http://localhost:4000'
const today = new Date()
const conf = {employeeMinAge: 18,};
const transcription = [
    {   lang: 'English',
        data : {
            footer : [
                'Choose language',
                'Current mode: day',
                'Current mode: night'
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
                'Photo',
                'Upload a photo',
                'Delete photo',
                'File format error! Choose an image file!',
                'Image not selected',
                'Image selected',
                'Edit employee',
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
                'Are you sure you want to delete employee data?',
                'Delete',
                'Cancel',
                'Edit employee record',
                'Delete employee record',
                'Employee profile picture',
                'Add employee profile'
            ]
        }
    },
    {   lang: 'Français',
        data : {
            footer: [
                'Choisissez la langue',
                'Mode courant : jour',
                'Mode courant : nuit'
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
                'Photo',
                'Télécharger une photo',
                'Supprimer la photo',
                'Erreur de format de fichier! Choisissez un fichier image!',
                'Image non sélectionnée',
                'Image sélectionnée',
                'Modifier l\'employé'
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
                'Êtes-vous sûr de vouloir supprimer les données des employés?',
                'Effacer',
                'Annuler',
                'Modifier la fiche de l\'employé',
                'Supprimer la fiche de l\'employé',
                'Photo de profil de l\'employé',
                'Ajouter un profil d\'employé'
            ]
        }
    }
]

export { API_REST_URL, today, conf, transcription };