<template>
	<form>
		<div class="futureinput futureinput--text">
			<label class="required" for="Name">Name</label>
			<input
				type="text"
				name="Name"
				id="Name"
				v-model="name"
				placeholder="please enter your name"
				@input="
					() => {
						if (name.length <= 0) {
							errors.name.push('Please enter a Name');
						} else {
							errors.name.pop();
						}
					}
				"
			/>
			<span class="futureinput__error" v-for="error in errors.name">{{
				error ? `[${error}]` : ""
			}}</span>
		</div>
		<div class="futurepanel__divider"></div>
		<div class="futureinput futureinput--text">
			<label class="required" for="discord">Discord name and Tag</label>
			<input
				type="text"
				name="discord"
				id="discord"
				placeholder="enter text here"
				v-model="discord"
				@input="check_discord()"
			/>
			<span class="futureinput__help"
				>This should be something like Lunarian#7912</span
			>
			<span class="futureinput__error" v-for="error in errors.discord">{{
				error ? `[${error}]` : ""
			}}</span>
		</div>
		<div class="futurepanel__divider"></div>
		<div class="futureinput futureinput--text">
			<label class="required" for="aboutyou">About You</label>
			<textarea
				name="aboutyou"
				maxlength="255"
				id="aboutyou"
				placeholder="Why do you want to join the Lunarians?"
				v-model="aboutyou"
				@input="
					() => {
						remaining_chars = 255 - aboutyou.length;
						if (aboutyou.length <= 0) {
							errors.aboutyou.push(
								'Please enter a reason for joining the Lunarians'
							);
						} else {
							errors.aboutyou.pop();
						}
					}
				"
			></textarea>
			<span class="futureinput__help"
				>{{ remaining_chars }}/255 remaining</span
			>
			<span class="futureinput__error" v-for="error in errors.aboutyou">{{
				error ? `[${error}]` : ""
			}}</span>
		</div>
		<div class="futurepanel__divider"></div>
		<input type="submit" value="Submit" class="futurebutton" />
	</form>
</template>

<script setup lang="ts">
import { ref } from "vue";
let name = ref("");
let discord = ref("");
let age = ref(0);
let aboutyou = ref("");
let remaining_chars = ref(255);

let errors = ref({
	aboutyou: [""],
	name: [""],
	discord: [""],
	age: [""],
});

const check_discord = () => {
	if (discord.value.length <= 0) {
		const index = errors.value.discord.indexOf("Please enter a discord tag");
		if (index === -1) {
			errors.value.discord.push("Please enter a discord tag");
		}
	} else {
		// remove the error that saies "Please enter a discord tag"
		const index = errors.value.discord.indexOf("Please enter a discord tag");
		if (index > -1) {
			errors.value.discord.splice(index, 1);
		}
	}
	// check if discord matches this regex: .+#\d{4}
	if (discord.value.match(/.+#\d{4}/)) {
		// remove the error that saies "Please enter a valid discord tag" from the array
		const index = errors.value.discord.indexOf("Please enter a valid discord tag");
		if (index > -1) {
			errors.value.discord.splice(index, 1);
		}
	} else {
		const index = errors.value.discord.indexOf("Please enter a valid discord tag");
		if (index === -1) {
			errors.value.discord.push("Please enter a valid discord tag");
		}
	}
};
</script>

<style lang="scss"></style>
