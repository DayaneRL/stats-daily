import { useEffect } from 'react';
import one from '../../../../assets/images/avatars/1.jpg';
import two from '../../../../assets/images/avatars/2.jpg';
import three from '../../../../assets/images/avatars/3.jpg';
import four from '../../../../assets/images/avatars/4.jpg';
import five from '../../../../assets/images/avatars/5.jpg';
import six from '../../../../assets/images/avatars/6.jpg';
import seven from '../../../../assets/images/avatars/7.jpg';
import eight from '../../../../assets/images/avatars/8.jpg';
import { CAvatar, CButton } from '@coreui/react';

const RenderImages = ({selectAvatar}) => {
    const images = [
        one, two, three, four, five, six, seven, eight
    ];

    return (
        images.map((image)=>(
            <CButton className='rounded-circle px-1' onClick={()=>selectAvatar(image)}>
                <CAvatar src={image} size='lg'/>
            </CButton>
        ))
    )
}

export default RenderImages;