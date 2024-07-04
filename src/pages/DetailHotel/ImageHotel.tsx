import Box from "@mui/material/Box";

interface ImageHotelProps {
    images: string[];
}
export default function ImageHotel({ images }: ImageHotelProps) {
    return (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
        }}>
            {images.map((image, index) => (
                <Box
                    sx={{
                        width: "33%"
                    }}
                    key={index}
                >
                    <img
                        src={image}
                        alt=""
                        style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            cursor: "pointer"
                        }}
                    />
                </Box>
            ))}
        </Box>
    )
}