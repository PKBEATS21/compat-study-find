import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight, Plus } from "lucide-react";

interface Subject {
  id: string;
  subject_name: string;
  exam_date: string | null;
  difficulty: number;
}

interface SubjectsPreviewProps {
  subjects: Subject[];
  maxVisible?: number;
}

export const SubjectsPreview = ({ subjects, maxVisible = 3 }: SubjectsPreviewProps) => {
  const navigate = useNavigate();
  const visibleSubjects = subjects.slice(0, maxVisible);
  const remainingCount = subjects.length - maxVisible;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            Your Subjects
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs"
            onClick={() => navigate("/subjects")}
          >
            View All
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {subjects.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-3">
              No subjects added yet
            </p>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => navigate("/subjects")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Subjects
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {visibleSubjects.map((subject) => (
              <Badge 
                key={subject.id} 
                variant="secondary" 
                className="text-xs py-1.5 px-3 font-medium"
              >
                {subject.subject_name}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge 
                variant="outline" 
                className="text-xs py-1.5 px-3 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => navigate("/subjects")}
              >
                +{remainingCount} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
