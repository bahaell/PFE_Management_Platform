fetch('http://localhost:8085/api/notifications', { 
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({ 
        userId: 1, 
        type: 'USER_CREATED', 
        title: '🔑 Nouveau Compte Système', 
        message: 'Un nouvel utilisateur administrateur de type "Coordinateur" a été ajouté à la plateforme.' 
    }) 
}).then(r => r.text()).then(console.log).catch(console.error);
