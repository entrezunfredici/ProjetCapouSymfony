<?php
$temperature=50;
$humidity=50;
?>
<script>
    Temperature=<?php echo $temperature; ?>
    Humidity=<?php echo $humidity; ?>
    alert(Temperature)
    TemperatureElem = document.getElementById("TemperatureValue")
    HumidityElem = document.getElementById("HumidityValue")
    TCSetMeasures(Temperature, Humidity)
    TemperatureElem.innerText = temperature;
    HumidityElem.innerText = humidity;
</script>