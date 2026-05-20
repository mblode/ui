import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export default function AccordionCard() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Find answers to common questions about our service.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion collapsible defaultValue="shipping" type="single">
          <AccordionItem value="shipping">
            <AccordionTrigger>What are your shipping options?</AccordionTrigger>
            <AccordionContent>
              We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free
              shipping on international orders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              Returns accepted within 30 days. Items must be unused and in original packaging.
              Refunds processed within 5-7 business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support">
            <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
            <AccordionContent>
              Reach us via email, live chat, or phone. We respond within 24 hours during business
              days.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
