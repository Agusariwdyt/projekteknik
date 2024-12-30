// Function to update the date and time
const host = "wss://broker.emqx.io:8084/mqtt";
const clientId = "kdjhfjdfffwdss";

const options = {
    keepalive: 30,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30000,
}

console.log("Menghubungkan ke broker");
const client = mqtt.connect(host, options);

client.subscribe("proyekteknik/#");

client.on("connect", () => {
    console.log("Berhasil terhubung ke broker");
});

client.on("message", function(topic, data){
    console.log(topic);
    console.log(data.toString());

    if(topic == "proyekteknik/batteryVoltage"){
        document.getElementById("baterai").innerHTML = data;
    }
    if(topic == "proyekteknik/weatherStatus"){
        document.getElementById("state").innerHTML = data;
    }
    if(topic == "proyekteknik/temperature"){
        document.getElementById("suhu").innerHTML = data;
    }
    if(topic == "proyekteknik/humidity"){
        document.getElementById("kelembaban").innerHTML = data;
    }
    if(topic == "proyekteknik/wind"){
        document.getElementById("angin").innerHTML = data;
    }
    if(topic == "proyekteknik/light"){
        document.getElementById("cahaya").innerHTML = data;
    }
    if(topic == "proyekteknik/air"){
        document.getElementById("udara").innerHTML = data;
    }
})

const slider = document.getElementById('slider');
  const sliderButton = document.getElementById('sliderButton');
  const sliderLabel = slider.parentElement;

  slider.addEventListener('change', () => {
    if (slider.checked) {
        client.publish("proyekteknik/liquidCrystal", "nyala");
        sliderLabel.classList.replace('bg-gray-300', 'bg-green-500'); // Change background color
        sliderButton.style.transform = 'translateX(1.25rem)'; // Move slider button to the right
    } else {
      client.publish("proyekteknik/liquidCrystal", "mati");
      sliderLabel.classList.replace('bg-green-500', 'bg-gray-300'); // Reset background color
      sliderButton.style.transform = 'translateX(0)'; // Reset slider button to the left
    }
  });