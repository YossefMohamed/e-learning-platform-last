import Link from "next/link";
import React from "react";
import { BsBook, BsDownload, BsPlayBtn, BsStopwatch } from "react-icons/bs";
import ReactPlayer from "react-player";
import LessonLayout from "../../../../../../../../layouts/LessonLayout";

function Lesson() {
  const [video, setVideo] = React.useState(false);

  React.useEffect(() => {
    setVideo(true);
  }, []);

  const html = `
<h1 class="ql-align-justify"><span style="background-color: transparent;">A teacher </span></h1><p class="ql-align-justify"><span style="background-color: transparent;">has an important place not only in student life bu</span><strong style="background-color: transparent;">t also in ev</strong><span style="background-color: transparent;">ery phase of life. They have all qualities which they distribute in their students. They know that not everyone has the same ability to receive, so a teacher observes all the abilities of each of their students and in the same way, they teach children. A teacher is a gre</span><strong style="background-color: transparent;">at listener of knowledge, </strong><span style="background-color: transparent;">prosperity, and light, from which we can benefit greatly throughout our life. Every teacher helps their students in choosing their path. Teachers teach their students how to respect elders. They tell their students the difference between respect and insult and many mor</span><strong style="background-color: transparent;">e. A teacher equips hi</strong><span style="background-color: transparent;">s/her </span></p><p class="ql-align-justify"><u style="background-color: transparent;">student with t</u><span style="background-color: transparent;">he knowledge, skills, and positive behavior honored which the student never feels lost. The teacher makes them aware of how to use time and the restriction of time. A good teacher makes a good impression on his students. When any student makes a mistake, the teacher t</span></p><ol><li class="ql-align-justify"><span style="background-color: transparent;">son and also makes them r</span></li><li class="ql-align-justify"><span style="background-color: transparent;">ealize their mistake.</span></li><li class="ql-align-justify"><span style="background-color: transparent;"> They teach us to wear clean clothes,</span></li><li class="ql-align-justify"><span style="background-color: transparent;"> eat healthy food, </span></li><li class="ql-align-justify"><span style="background-color: transparent;">stay away from the wrong food,</span></li><li class="ql-align-justify"><span style="background-color: transparent;"> take care of parents, treat others well</span></li><li class="ql-align-justify"><span style="background-color: transparent;">and help us in understanding the importance of completing work.&nbsp;</span></li></ol><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong style="background-color: transparent;"><em>A teacher</em></strong><span style="background-color: transparent;"> has many qualities which hold a special place in every student’s life.  at </span><a href="https://stackoverflow.com/" rel="noopener noreferrer" target="_blank" style="background-color: transparent;">Link here</a> <span style="background-color: transparent;">Teachers embrace</span></p><p class="ql-align-justify"><span style="background-color: transparent;"> various roles they are our friends when we get sad, our parents when we are hurt, and always good advisers. </span></p><p class="ql-align-justify"><span style="background-color: transparent;">Teachers reward their students for their good work while sometimes punishing them for realizing the mistake to understand that this is not right for their lives.</span></p><p class="ql-align-justify"><span style="background-color: transparent;">Children’s future and present both are made by the teacher. He also enhances a good society by creating a good student throughout his life. Only a teacher knows what kind of association his student lives in and what kind of association he holds.</span></p><p><br></p>
      `;

  return (
    <LessonLayout>
      <>
        <div className="flex gap-6">
          <div className="flex-1 border p-4 flex flex-col">
            <div className="icons flex flex-col  flex-1 justify-center gap-4 max-h-[650px] ">
              <div className="group flex-1 flex flex-col gap-4  overflow-y-auto ">
                <div className=" m-0 text-xl   border-b-4 py-2">
                  <span className="font-bold uppercase">Questions :</span>{" "}
                  Integration by parts rule with examples
                </div>
                <div className="description py-4 max-h-[100%] overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </LessonLayout>
  );
}

export default Lesson;
