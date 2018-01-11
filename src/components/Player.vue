<template>
  <div>
    <router-link :to="{ path: 'play/playerone', params: { team: 'jhon doe', player: 'azhari' }}">
    <div class="demo-card-image mdl-card mdl-shadow--2dp" id="one">
      <div class="mdl-card__title mdl-card--expand"></div>
      <div class="mdl-card__actions">
        <span class="demo-card-image__filename">Image.jpg</span>
      </div>
    </div>
    </router-link>

    <router-link :to="{ path: 'play/playertwo', params: { team: 'foobar', player: 'fajar' }}">
    <div class="demo-card-image mdl-card mdl-shadow--2dp" id="two">
      <div class="mdl-card__title mdl-card--expand"></div>
      <div class="mdl-card__actions">
        <span class="demo-card-image__filename">Image.jpg</span>
      </div>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Player'
}
</script>

<style>
.demo-card-image.mdl-card{
  width: 256px;
  height: 256px;
  margin-bottom: 20px;
}

#two {
  background: url('http://rs9.pbsrc.com/albums/a80/Connor24/metal%20slug%20gifs/thmetal_slug003.gif~c200') center / cover;
}

#one {
  background: url('http://i0.kym-cdn.com/photos/images/original/000/945/732/73b') center / cover;
}

.demo-card-image > .mdl-card__actions {
  height: 52px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
}
.demo-card-image__filename {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

</style>
