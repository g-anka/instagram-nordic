import { FC } from 'react'
import {
    SortableContainer,
    SortableElement,
    arrayMove,
} from 'react-sortable-hoc'
import styled from 'styled-components'

const SortableItem = SortableElement<{ image: string }>(
    ({ image }: { image: string }) => <Image src={image} alt="" />
)

const SortableList = SortableContainer<{ images: string[] }>(
    ({ images }: { images: string[] }) => {
        return (
            <div>
                {images.map((image, index) => (
                    <SortableItem key={image} index={index} image={image} />
                ))}
            </div>
        )
    }
)

type ImagesProps = {
    images: string[]
    onSort: (images: string[]) => void
}
const ImagesOrder: FC<ImagesProps> = ({ images, onSort }) => {
    const handleSortEnd = ({
                               oldIndex,
                               newIndex,
                           }: {
        oldIndex: number
        newIndex: number
    }) => {
        const newArray = arrayMove(images, oldIndex, newIndex)
        onSort(newArray)
    }
    return <SortableList axis="xy" images={images} onSortEnd={handleSortEnd} />
}

export default ImagesOrder

const Image = styled.img`
  aspect-ratio: 1.5;
  object-fit: cover;
  width: 200px;
`