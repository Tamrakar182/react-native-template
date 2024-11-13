import { View, Pressable } from 'react-native'

interface Props {
    checked: boolean;
    onPress: () => void;
}

const Checkbox = ({ checked, onPress }: Props) => {
    return (
        <Pressable
            onPress={onPress}
        >
            {checked
                ?
                <View
                    className='w-[18px] h-[18px] rounded-[2px] bg-orange'
                    style={{
                        width: 18,
                        height: 18
                    }}
                />
                :
                <View
                    className='w-[18px] h-[18px] rounded-[2px] bg-neutral-100'
                    style={{
                        width: 18,
                        height: 18
                    }}
                />
            }
        </Pressable>
    )
}

export default Checkbox