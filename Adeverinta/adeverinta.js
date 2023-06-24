const profileData = {
    "FEFS": ["Educatie fizica si sportiva", "Kinetoterapie si motricitate speciala", "Nutritie si dietica", "Balneofiziokinetoterapie si recuperare"],
    "FIA": ["Ingineria produselor alimentare", "Controlul si expertiza produselor alimentare", "Protectia consumatorului si a mediului"],
    "FIESC": ["Calculatoare", "Automatica si informatica aplicata", "Electornica aplicata", "Managementul energiei", "Sisteme electrice", "Inginerie economica si domeniul electric, electronic si energetic"],
    "FIM": ["Mecatronica", "Inginerie economica si domeniul mecanic", "Tehnologia constructiilor de masini"],
    "FIG": ["Geografie", "Geografia turismului", "Istorie", "Relatii internationale si studii europene", "Stiinte politice", "Asistenta sociala"],
    "FLSC": ["Limba si literatura romana", "Limba si literatura engleza", "Limba si literatura franceza", "Limba si literatura ucraineana", "Comunicare si relatii publice"],
    "FMSB": ["ProfilA", "ProfilB", "ProfilC"],
    "FS": ["Silvicultura", "Ecologia si protectia mediului"],
  };

  const facultateSelect = document.getElementById('faculty');
  const profileContainer = document.getElementById('profile-container');

  facultateSelect.addEventListener('change', function () {
    const selectedFacultate = facultateSelect.value;
    console.log(selectedFacultate);

    const profileList = profileData[selectedFacultate];
    renderProfiles(profileList);
  });

  function renderProfiles(profiles) {
    profileContainer.innerHTML = '';
    const profileTitle = document.createElement('h2');
    profileTitle.textContent = "Profile";
    profileContainer.appendChild(profileTitle);

    const profileSelect = document.createElement('select');
    profileSelect.required = true;
    profileSelect.id = 'studyProgram';
    profileSelect.name = 'studyProgram';

    profileContainer.appendChild(profileSelect)

    const profileSelectDefaultValue = document.createElement('option');
    profileSelectDefaultValue.disabled = true;
    profileSelectDefaultValue.selected = true;
    profileSelectDefaultValue.value = "none";
    profileSelectDefaultValue.text = "-- Selecteaza un program de studiu --";
    profileSelect.appendChild(profileSelectDefaultValue);

    profiles.forEach(function (profile) {
      const profileOption = document.createElement('option');
      profileOption.value = profile;
      profileOption.text = profile;
      profileSelect.appendChild(profileOption);
    });
  }
