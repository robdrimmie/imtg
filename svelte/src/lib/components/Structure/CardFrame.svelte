<script>
    export let item

    import Attributes from '$lib/Attributes.js'
	import Modifiers from '$lib/Modifiers.js'

    $: icon = item.attribute ? Attributes.icons[item.attribute] : ''
    $: name = item.name

    let effectivenessIcon
    switch (item.effectiveness) {
        case Modifiers.EFFECTIVENESS_VERY_LOW:
            effectivenessIcon = Modifiers.EFFECTIVENESS_VERY_LOW_ICON
            break;

        case Modifiers.EFFECTIVENESS_LOW:
            effectivenessIcon = Modifiers.EFFECTIVENESS_LOW_ICON
            break;

        case Modifiers.EFFECTIVENESS_MIDDLE:
            effectivenessIcon = Modifiers.EFFECTIVENESS_MIDDLE_ICON
            break;

        case Modifiers.EFFECTIVENESS_HIGH:
            effectivenessIcon = Modifiers.EFFECTIVENESS_HIGH_ICON
            break;

        case Modifiers.EFFECTIVENESS_VERY_HIGH:
            effectivenessIcon = Modifiers.EFFECTIVENESS_VERY_HIGH_ICON
            break;

        default:
            effectivenessIcon = Modifiers.EFFECTIVENESS_VERY_LOW_ICON
    }

    let xcreaseIcon = item.increase ? Modifiers.INCREASE_ICON : Modifiers.DECREASE_ICON
</script>


  <svg version="1.1"
       width="64" height="89"
       xmlns="http://www.w3.org/2000/svg">
  
    <!-- Card Outline takes up the whole space-->
    <rect width="64" height="89" x="00" y="0" fill="#FFEFD3" stroke="#818D92" stroke-width="1" />
    
    <slot></slot>

    <text x="8" y="75" font-size="16" >{xcreaseIcon} {effectivenessIcon} {icon}</text>
  
</svg>
