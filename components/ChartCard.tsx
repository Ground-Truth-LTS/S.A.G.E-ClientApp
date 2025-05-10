import { View, Text, Card, H5 } from 'tamagui';
import { ArrowBigDownDash, ArrowBigUpDash, Equal } from '@tamagui/lucide-icons';
import { ReactNode } from 'react';

interface ChartCardProps {
    value: string | number; // Its assumed that this is value before passing to the component
    trend?: 'up' | 'down' | 'equal'; // TODO: Modify this so the trend is decided by the value
    content?: ReactNode; // The content in the Card, pass a React Component as attribute
}

export default function ChartCard({ value, trend = 'equal', content }: ChartCardProps) {

    const TrendIcon = () => {
        switch (trend) {
          case 'up':
            return <ArrowBigUpDash color="$accent1" />;
          case 'down':
            return <ArrowBigDownDash color="$red10" />;
          case 'equal':
          default:
            return <Equal color="$yellow10" />;
        }
      };

    return (
        <Card 
            height={140}
            borderBottomWidth={1}
            backgroundColor="$color0"
            borderBottomColor="$color8"
            marginTop={20}
            >
        <View 
        alignItems='center'
        flexDirection='row'
        paddingTop={5}
        >
            <H5
            fontWeight={400}
            color="$color8"
            fontSize={24} 
            paddingLeft={10}
            >
                Overall {value} 
            </H5>
            <TrendIcon/>
        </View>

         
        {content} 
        
        </Card>
    )

}