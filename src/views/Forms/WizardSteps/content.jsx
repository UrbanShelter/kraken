import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Helvetica"
  },
  title: {
    fontSize: 18,
    textAlign: "center"
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 14,
    margin: 12
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "justify"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey"
  }
});

const doc = props => (
  <Document>
    <Page style={styles.body} wrap>
      <Text style={styles.header} fixed>
        ~ Created with react - pdf ~
      </Text>
      <Text style={styles.title}> Don Quixote of La Mancha </Text>
      <Text style={styles.author}> Miguel de Cervantes </Text>
      <Image
        style={styles.image}
        src=" http://static.donquijote.org/images/blogs/dq-reg/don-quijote-de-la-mancha.jpg "
      />
      <Text style={styles.subtitle}>
        Chapter I : What is the character and pursuits of the famous gentleman D
        . Quixote of the Stain
      </Text>
      <Text style={styles.text}>
        In a place in La Mancha, whose name I do not want to remember, has not
        Long time lived a hidalgo of the spear in shipyard, Adarga old, skinny
        horseradish and galgo corridor . A pot of something more cow than ram,
        salpicón the most nights, duels and losses on Saturdays, lentils on
        Fridays, some palomino on Sundays, they consumed the three parts of
        their farm . The rest of it concluded of velarte, hairy breeches for the
        holidays with their slippers same, the weekdays were honored with his
        vellori of the most Fine . He had at his house a mistress who was over
        forty, and a niece that he was not in his early twenties, and a young
        man in the countryside and in the plaza, saddled the horse as he took
        the pruning shear . Frisaba the age of our A gentleman in his fifties,
        he had a strong build, dry of flesh, lean face; great early bird and
        friend of the hunting . They want to say that had the nickname of
        Quijada or Quesada (that in this there is some difference in the authors
        who write this case), although plausible conjectures let it be
        understood that it is called Quijana; but this it matters little to our
        story; it is enough that in the narration of him it does not leave a
        point of truth.
      </Text>
      <Text style={styles.text}>
        It is, then, to know, that this aforementioned gentleman, the times he
        was idle (which were the most of the year) was given to read books of
        chivalry with so much love and taste, that he forgot almost every point
        the exercise of hunting, and even the administration of his farm; and he
        reached both his curiosity and nonsense in this, which sold many hanegas
        of land of seeding, to buy chivalry books to read; and so it took to his
        house all who could have dellos; and of all none They seemed as good as
        those made by the famous Feliciano de Silva : because the clarity of his
        prose, and those intricate reasons of his, They looked like pearls; and
        more when he came to read those compliments and letters of challenge,
        where in many places he found written : the reason for the unreason that
        my reason is made, in such a way my reason weakens, I rightly complain.
      </Text>
      <Text style={styles.text}>
        With these and similar reasons the poor gentleman lost his judgment, and
        unveiled by understanding them, and unraveling the meaning, that is not
        it would not be understood by Aristotle himself, if he resuscitated for
        only it . He was not very good with the wounds Don Belianis gave and
        received, because he imagined that by great teachers who had cured, he
        would not stop having his face and his whole body full of scars and
        signs; but yet he praised his author for finishing his book with the
        promise of that endless adventure, and many times came wanting to take
        the pen, and end the letter as there it is promised; and without a doubt
        he would do it, and even leave with it, if other greater and continuous
        thoughts will not hinder him . He had many times competition with the
        priest of his place (he was a learned graduate man) in Sigüenza), about
        which had been a better gentleman, Palmerín de England or Amadis of
        Gaula; mas maestro Nicolás, barber of the same village, said that none
        of them reached the gentleman of Phoebus, and that if any you could
        compare him, it was Don Galaor, brother of Amadis de Gaula, because He
        had a well-off condition for everything; that he was not a gentleman
        picky, not as crying as his brother, and that in the courage not he was
        behind him.
      </Text>
      <Text style={styles.text}>
        In resolution, he became so engrossed in his reading, that the nights
        reading in clear, and the days of cloudy in turbid, and thus, from the
        little sleep and from a lot of reading, his brain dried up, so that He
        came to lose his mind . Llen Osele fantasy of everything I read in
        books, in charms, in quarrels, battles, challenges, wounds, compliments,
        loves, storms and nonsense impossible, and settled in such a way in the
        imagination that it was true all that machine of those dreamed
        inventions that I read, that for he had no other more true story in the
        world.
      </Text>
    </Page>
    <Page>
      <Text style={styles.subtitle} break>
        Chapter II : What is the first way out of your land made by the
        ingenious Don Quixote
      </Text>
      <Image
        style={styles.image}
        src=" http://static.donquijote.org/images/blogs/dq-reg/don-quijote-de-la-mancha.jpg "
      />
      <Text style={styles.text}>
        Made, then, these preventions, did not want to wait any longer to put in
        effect his thought, squeezing the lack that he thought in the world his
        delay, according to the grievances that he thought undo, one-eyed to
        untap, unreasons to emend and abuses that improve and debts to satisfy .
        And so, without reporting to any person of his intention and without
        anyone seeing him, one morning, before the day, that It was one of the
        hot ones of the month of July, he armed himself with all his weapons, He
        climbed on Rocinante, putting on his badly composed headpiece, embracing
        his Adarga, took his spear and through the false door of a corral went
        to the field with great happiness and joy to see how easily there was
        given beginning to your good wish . But he barely saw himself in the
        field when he assaulted a terrible thought, and such, that it almost
        made him leave the started company; and it was that it came to his
        memory that he was not armed gentleman, and that, according to the law
        of chivalry, he could not and should not take weapons with no knight;
        and since it was, he had to carry weapons white, as a new gentleman,
        without company on the shield, until his effort won it . These thoughts
        made him hesitate in his purpose; but his madness being more than any
        other reason, he proposed make himself knight of the first one he met,
        in imitation of others many who did so, he said he had read do in books
        such I Teni n . In the case of knives, I thought to clean them in a way,
        in taking place, that they were more than an arminian; and with this he
        quieted down and He went on his way, carrying no other than that which
        his horse wanted, believing that in that consisted the force of the
        adventures
      </Text>
      <Text style={styles.text}>
        Going, then, walking our brand new adventurer, he was talking to himself
        mesmo, and saying : - Who doubts, but in the coming times, when the true
        story of my famous events comes to light, that the wise that I write
        them do not put, when I get to tell this my first exit so tomorrow, this
        way ?: There was hardly the ruddy Apollo lying on the face of the broad
        and spacious land the gilt strands of her beautiful hair, and just the
        small ones and painted little birds with their harpy tongues had greeted
        with sweet and mellifluous harmony the coming of the pink Aurora, who,
        leaving the soft bed of jealous husband, by the doors and balconies of
        the manchego horizon to the mortals showed up, when the famous gentleman
        Don Quixote of the Stain, leaving the idle feathers, climbed on his
        famous horse Rocinante and began to walk through the old and well-known
        Campo de Montiel.
      </Text>
      <Text style={styles.text}>
        And it was the truth that he walked through; and added saying : -Blessed
        age and Happy century, where my famous deeds will come to light, worthy
        of being carved in bronze, carved in marble and painted in tables, for
        memory in the future. Oh you, lovely sage, whoever that you are, who has
        to touch the coronist being of this pilgrim history ! I beg you not to
        forget my good Rocinante, eternal companion of mine in all my roads and
        careers.
      </Text>
      <Text style={styles.text}>
        Then he would come back saying, as if he were truly in love : -Oh
        Princess Dulcinea, lady of captive heart ! A lot of harm to me habedes
        date me to say goodbye and reproach me with the rigorous settlement to
        send me not to appear before your fame . Pl égaos, lady, of membraros
        from your heart subject, that you care so much for your love suffers .
        With these he was stringing other nonsense, all in the manner of those
        that his books had taught him, imitating as soon as he could language .
        With this he walked so slowly, and the sun came so hard and with so much
        ardor, that it was enough to melt his brains, if some I had
      </Text>
      <Text style={styles.text}>
        Almost all that day walked without happening to him something that to
        tell was, of which was getting desperate, because I would like to run
        afterwards with whom make experience of the value of your strong arm .
        Authors there are that say that the first adventure that came to him was
        that of Port L apeice, others they say that of the windmills; but what I
        could find out in this case, and what I have found written in the annals
        of the Mancha, is that he walked all that day, and, in the evening, his
        horse and he they found themselves tired and starved, and looking
        everywhere to see if I would discover a castle or a shepherd's flock
        where to collect himself and where he could remedy his great hunger and
        need, he saw, far from the road where I was going, a sale, which was as
        if I saw a star that, not to the portals, but to the palaces of his
        redemption He is heading . Diose priesa to walk, and arrived at her in
        time that It was getting dark.
      </Text>
    </Page>
  </Document>
);

export default doc;
