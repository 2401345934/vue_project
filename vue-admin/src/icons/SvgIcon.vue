<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
  import { reactive, ref, ifRef, toRefs, onMounted, computed } from "@vue/composition-api";

  export default {
    name: "SvgIcon",
    props: {
      iconClass: {
        type: String,
        default: ""
      },
      className: {
        type: String,
        default: ""
      }
    },
    setup(props) {
      const iconName = computed(() => `#icon-${props.iconClass}`);

      const svgClass = computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`;
        }
        return `svg-icon`;
      });

      return {
        svgClass,
        iconName
      };
    }
  };
</script>

<style scoped lang="scss">
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    color: greenyellow;
}

</style>