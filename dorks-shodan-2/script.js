
let searchText = '';
let optionLinks = {};


function updateSearchText() {
    searchText = document.getElementById('searchText').value;
    displayOptions();
}
function displayOptions() {
    fetch('key-word-shodan-2.json')
        .then(response => response.json())
        .then(data => {
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            optionLinks = {};

            for (const optionKey in data) {
                if (data.hasOwnProperty(optionKey)) {
                    const option = data[optionKey];


                    const optionElement = document.createElement('div');
                    optionElement.classList.add('options');
                    optionElement.innerHTML = `<h3>${optionKey}</h3>`;

                    const dorkNamesElement = document.createElement('div');
                    dorkNamesElement.classList.add('dorkNames');

                    for (const dorkKey in option) {
                        if (option.hasOwnProperty(dorkKey)) {
                            const dorkName = option[dorkKey];
                            const modifiedDorkName = dorkName.replace('rep-text', searchText);
                            const link = `https://beta.shodan.io/search?query=${(modifiedDorkName)}`;


                            const dorkNameElement = document.createElement('p');
                            dorkNameElement.innerHTML = `<a class="dorkName" href="${link}" target="_blank">${dorkKey}</a>`;
                            dorkNamesElement.appendChild(dorkNameElement);

                            if (!optionLinks[optionKey]) {
                                optionLinks[optionKey] = [];
                            }
                            optionLinks[optionKey].push(link);
                        }
                    }

                    optionElement.appendChild(dorkNamesElement);

                    optionsContainer.appendChild(optionElement);
                    optionElement.addEventListener('click', function () {
                        dorkNamesElement.style.display = (dorkNamesElement.style.display === 'none') ? 'block' : 'none';
                    });
                }
            }
        })
        .catch(error => console.error('An error occurred while fetching data:', error));
}

function openAllLinksForSelectedOption() {
    try {
        const selectedOption = document.getElementById('openAllLinksOption').value;
        console.log('Selected Option:', selectedOption);
        const timeInterval = document.getElementById('timeInterval').value;
        console.log('Time Interval:', timeInterval);
        const links = optionLinks[selectedOption];
        if (links) {
            links.forEach((link, linkIndex) => {
                setTimeout(() => {
                    console.log('Opening Link:', link);
                    window.open(link, '_blank');
                }, linkIndex * (timeInterval * 2000));
            });
        } else {
            console.error('No links found for the selected option.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
function openAllLinksForAllOptions() {
    try {
        const timeInterval = document.getElementById('timeInterval').value;
        console.log('Time Interval:', timeInterval);

        const optionKeys = Object.keys(optionLinks);

        optionKeys.forEach((optionKey, optionIndex) => {
            const links = optionLinks[optionKey];

            links.forEach((link, linkIndex) => {
                setTimeout(() => {
                    console.log(`Opening Link for Option ${optionKey}:`, link);
                    window.open(link, '_blank');
                }, (optionIndex * links.length + linkIndex) * (timeInterval * 2000));
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}




function updateSelectOptions() {
    fetch('key-word-shodan-2.json')
        .then(response => response.json())
        .then(data => {
            const openAllLinksOption = document.getElementById('openAllLinksOption');
            openAllLinksOption.innerHTML = '';


            for (const optionKey in data) {
                if (data.hasOwnProperty(optionKey)) {
                    const optionElement = document.createElement('option');
                    optionElement.value = optionKey;
                    optionElement.innerText = optionKey;
                    openAllLinksOption.appendChild(optionElement);
                }
            }
        })
        .catch(error => console.error('An error occurred while fetching data:', error));
}
document.addEventListener('DOMContentLoaded', function () {
    setInterval(function () {
        var changingTextElement = document.getElementById('changingText');
        var currentText = changingTextElement.innerText.trim();

        if (currentText === 'Dorks shodan2') {
            changingTextElement.innerHTML = 'Free Palestine <i class="icon"><img src="Free-Palestine.png" alt="Free Palestine"></i>';
        } else {
            changingTextElement.innerHTML = 'Dorks shodan2 <i class="icon"><img src="Free-Palestine-2.png" alt="Free Palestine"></i>';
        }
    }, 4000);
});
updateSelectOptions();
displayOptions();


