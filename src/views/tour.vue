<template>
  <div class="tour-page">
  	<div class="tour-page-left">
  		<img class="tour-dream-pic" src="../assets/logo.png"/>
  		<div class="tour-dream-date">2024-06-30</div>
  		<div class="tour-dream-name">a girl with a unicon under the sky</div>
  	</div>
  	<div class="tour-page-right">
  		<div class="tour-detail">
			<div class="tour-detail-context">
				<div class="tour-detail-title">Dream Symbols</div>
				<div class="tour-detail-mark">#girl #unicorn #sky</div>
				<div class="tour-analysis-tilte">Dream Analysis</div>
				<div class="tour-analysis-detail">The unicorn and the sky often symbolize hope and idealism, reflecting the dreamer's longing for beauty and perfection, the combination of the girl and the unicorn may convey a sense of innocence and naivety, indicating the dreamer's yearning for purity and a simpler life.</div>
				<div class="tour-guidance-tilte">Psychological guidance</div>
				<div class="tour-guidance-detail">Embrace your emotional and intuitive side through mindfulness and creative activities, and explore spiritual practices that resonate with you, such as meditation or yoga This dream likely symbolizes the dreamer's deep-seated desires and ideals, including aspirations for purity, freedom, and transcendence</div>
			</div>
			<div class="tour-detail-bottoms">
				<div class="tour-bottom-btn tour-bottom-share">Share this dream</div>
				<div class="tour-bottom-btn tour-bottom-download">Download Image</div>
			</div>
		</div>
  	</div>
  </div>
</template>

<script setup>

</script>

<style>
.tour-page {
	flex: 1;
	display: flex;
}
.tour-page-left {
	flex: 3;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.tour-page-right {
	flex: 5;
}
.tour-dream-pic {
	width: 22vw;
	height: 26vw;
	border-radius: 50%/50%;
	box-shadow: 0 0 1vh 2vh #351C69;
}
.tour-dream-date {
	margin-top: 22px;
	color: white;
	opacity: 60%;
}
.tour-dream-name {
	margin-top: 10px;
	padding: 0 6vw;
	color: white;
	word-wrap:break-word;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tour-detail {
	color: white;
	padding: 4vh;
	border: solid 1px white;
	width: 55vw;
	height: 75vh;
	border-radius: 30px;
	display: flex;
	flex-direction: column;
}
.tour-detail-context {
	flex: 1;
}
.tour-detail-title {
	font-size: 24px;
	line-height: 30px;
	margin-bottom: 8px
}
.tour-detail-mark {
	height: 8vh;
	font-size: 16px;
}
.tour-analysis-tilte {
	font-size: 24px;
	line-height: 30px;
	margin-bottom: 8px;
}
.tour-analysis-detail {
	font-size: 16px;
	margin-bottom: 16px;
}
.tour-guidance-tilte {
	font-size: 24px;
	line-height: 30px;
	margin-bottom: 8px;
}
.tour-guidance-detail {
	font-size: 16px;
}
.tour-detail-bottoms {
	display: flex;
	align-items: center;
}
.tour-bottom-btn {
	width: 18vw;
	height: 8vh;
	border: solid 1px white;
	border-radius: 4vh;
	margin-right: 4vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tour-bottom-share {
	
}
.tour-bottom-download {
	
}
</style>
