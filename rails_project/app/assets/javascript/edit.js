console.log("YAY THIS IS LOADED")

/**
 * The strategy is to have an invisible form field for transcription.
 * The clone script will take the content in transcription form and span it out into grid div.
 * On clicking "Save recording", we run the update script to update the transcription form before ruby code is processed.
 */


function cloneTranscriptionFormContent(){

    let transcriptionForm = document.getElementById('transcription_hidden')
    let transcriptionFormContentRaw = transcriptionForm.textContent

    let transcriptionFormContent = formatTranscriptionFormContentRaw(transcriptionFormContentRaw)

    createGridFromContent(transcriptionFormContent)
}

/** we first turn content into an array of objects 
 * e.g. [
 * {
 *  timestamp:'00:00:00,000 --> 00:00:10,000:',
 *  content:'blue steal'
 * },
 * {
 *  timestamp:'00:00:10,000 --> 00:00:20,000:',
 *  content:'steal bag'
 * }
 * ]
 * */ 
function formatTranscriptionFormContentRaw (transcriptionFormContentRaw) {
    let returnArray = []
    let splitTranscriptionFormContentRaw = transcriptionFormContentRaw.split('\n')
    for (let i = 0; i < splitTranscriptionFormContentRaw.length; i+=2) {
        let timestamp = splitTranscriptionFormContentRaw[i];
        let content = splitTranscriptionFormContentRaw[i+1];

        returnArray.push({
            timestamp,content
        })
    }
    return returnArray
}

function createGridFromContent(transcriptionFormContent){
    const textTranscription = document.getElementById('transcription')
    transcriptionFormContent.forEach((timestampContent)=>{

        let timestampElement = document.createElement('div')
        timestampElement.className = 'transcription-box-timestramp'
        timestampElement.id=timestampContent.timestamp
        timestampElement.textContent = formatTimestamp(timestampContent.timestamp)
        textTranscription.appendChild(timestampElement)
    
        let contentElement = document.createElement('p')
        contentElement.contentEditable = true
        contentElement.textContent = timestampContent.content
        textTranscription.appendChild(contentElement)
    
    })
}

/**
 * Formats the timestamp nicely for display
 * @param {*} timestamp given in format 00:00:00,000 --> 00:00:10,000:
 * @returns 00:00
 */
function formatTimestamp(timestamp){
    let startTimeStamp = timestamp.split('-->')[0].split(',')[0]
    let splitStartTimeStamp = startTimeStamp.split(':')
    return `${splitStartTimeStamp[1]}:${splitStartTimeStamp[2]}`
}

/**
 * The function will reconstruct the transcription from the visible transcription box, and modify the hidden form's content.
 */
function onSaveRecording(){
    const hiddenTranscriptionForm = document.getElementById('transcription_hidden')
    const transcriptionContent = formatTranscriptionFormContentRaw(hiddenTranscriptionForm.textContent)
    const textTranscription = document.getElementById('transcription')
    const textTranscriptionChildren = textTranscription.children
    // loop through to edit tanscriptionContent
    for (let i = 0; i < textTranscriptionChildren.length; i+=2) {
        const timestampElement = textTranscriptionChildren[i];
        const contentElement = textTranscriptionChildren[i+1]
        // Do stuff
        const indexOfTranscriptionContent = transcriptionContent.findIndex((timestampContent)=>{
            return timestampContent.timestamp === timestampElement.id
        })

        transcriptionContent[indexOfTranscriptionContent].content = contentElement.textContent
      }

    // reconstruct raw string
    const transcriptionContentString = transcriptionContent.reduce((previousValue, currentValue,currentIndex,array)=>{
        if(currentIndex != array.length-1){
            return previousValue+= `${currentValue.timestamp}\n${currentValue.content}\n`
        }else{
            return previousValue+= `${currentValue.timestamp}\n${currentValue.content}`
        }
    },'')

    // update hidden text
    hiddenTranscriptionForm.textContent = transcriptionContentString
}
window.onload = ()=> {
    cloneTranscriptionFormContent()
    // prevents the default submit function
    $('form').submit(function(e) {
        onSaveRecording()
        return true
      });
      
}
