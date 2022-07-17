const today = new Date()
const conf = {employeeMinAge: 18,};
const transcription = [
    {   lang: 'En',
        data : [
        'Choose language',
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
    ]},
    {   lang: 'Fr',
        data : [
        'Choisissez la langue',
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
    ]}

    
]

export { today, conf, transcription };